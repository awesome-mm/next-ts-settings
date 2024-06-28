import {Cache} from "@/constants/index";
import Cookies from "js-cookie";
import {parseJWT} from "@/utils/JWT";

//Refresh Token & User Info
/**
 * @desc 쿠키: refreshToken, userinfo(파싱) GET
 * @return {{ refreshToken: string, accessToken: string, userInfo: any }}
 * */
export const getTokenCookies = () => {
  const refreshToken = Cookies.get(Cache.REFRESH_TOKEN) || "";
  const accessToken = Cookies.get(Cache.ACCESS_TOKEN) || "";
  const getInfo = Cookies.get(Cache.USER_INFO);
  let userInfo = {};
  if (getInfo) userInfo = JSON.parse(getInfo);
  return {refreshToken, accessToken, userInfo};
};

/**
 * @desc 쿠키: refreshToken,userInfo SET
 * @param {{ refreshToken: string, userInfo: any }}
 * */
export const setTokenCookies = ({refreshToken, accessToken}: {refreshToken: string; accessToken: string}) => {
  // todo: 현재 accessToken, refreshToken, userInfo 로 되어있음
  if (refreshToken) Cookies.set(Cache.REFRESH_TOKEN, refreshToken);
  if (accessToken) {
    const userInfo = parseJWT(accessToken);
    Cookies.set(Cache.ACCESS_TOKEN, accessToken);
    Cookies.set(Cache.USER_INFO, JSON.stringify(userInfo));
  }
};

/**
 * @desc 쿠키: refreshToken,userInfo DELETE
 * */
export const removeTokenCookies = () => {
  Cookies.remove(Cache.REFRESH_TOKEN);
  Cookies.remove(Cache.ACCESS_TOKEN);
  Cookies.remove(Cache.USER_INFO);
};
