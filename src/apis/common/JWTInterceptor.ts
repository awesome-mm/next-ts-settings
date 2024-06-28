import {UserInfo} from "@/model/userInfo";
import {auth} from "@/apis/index";
// import store from "@/store/main";
// import {login, logout} from "@/store/modules/authSlice";
import {getTokenCookies, removeTokenCookies} from "@/utils/cookies";
import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios";

export const setInterceptors = (instance: AxiosInstance) => {
  // 요청 인터셉터
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const {accessToken} = getTokenCookies();
      config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError | any) => {
      console.log("요청 error", error);
      const originalRequest = error.config;
      const cookies = getTokenCookies();
      if (!cookies.accessToken || !cookies.refreshToken || !cookies?.userInfo) return removeTokenCookies();
      const {cNo, cName} = cookies.userInfo as UserInfo;
      const {refreshToken, accessToken} = cookies;

      // 엑세스토큰 401 시간만료 응답 오류 처리 ( 시간 만료  )
      if (error.response?.status === 401) {
        console.log("401 refresh error.response ", error.response);
        console.log("401 refresh error", error);
        // 새로운 토큰 발급 요청
        try {
          const {data} = await getNewToken(refreshToken, accessToken);
          console.log("401 리프래쉬 성공", data);
          // store.dispatch(login({...data}));
          originalRequest.headers.Authorization = `Bearer ${data.data?.accessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // 토큰 발급 시 오류
          console.log("토큰 발급 시 오류", refreshError);
          // 만료된 토큰인 경우
          // store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      // 유효 하지 않을 때 유저 정보 삭제, 로그인 페이지로 이동
      if (error.response?.status === 403) {
        try {
          const {data} = await postLogout(cNo, cName);
          console.log("로그아웃 403  interceptors", data);
        } catch (error) {
          console.log("403 token error", error);
        } finally {
          // store.dispatch(logout());
        }
        return Promise.reject(originalRequest);
      }
      return Promise.reject(error);
    },
  );
  return instance;
};

const getNewToken = async (accessToken: string, refreshToken: string) => {
  try {
    return await auth.post("/refresh", {
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    console.log("401 get token error", error);
    return Promise.reject(error);
  }
};

const postLogout = async (cNo: number, cName: string) => {
  try {
    return await auth.post("/logout", {cNo, cName});
  } catch (error: any) {
    console.log("403 token error", error);
    return Promise.reject(error);
  }
};
