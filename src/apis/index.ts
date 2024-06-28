import axios from "axios";
import {setInterceptors} from "./common/JWTInterceptor";

/**
 * @description token이 필요없는 Guest
 */
function createInstanceGuest() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_AUTH,
  });
}

/**
 * @description auth + token instance 회원 관련 요청
 * @param url
 */
function createInstanceAuth(url: string) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_AUTH}${url}`,
  });
  return setInterceptors(instance);
}

/**
 * @description token이 필요없는 java
 */
function createInstanceGuestJava(url: string) {
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_JAVA}${url}`,
  });
}

/**
 * @description user + token instance 사용자화면 java CUD 요청
 * @param url
 */
function createInstanceJava(url: string) {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_JAVA}${url}`,
  });
  return setInterceptors(instance);
}

/**
 * @description mocking - msw
 * @param url
 */
function createInstanceMockServer(url: string) {
  return axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_MOCK}${url}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// port 15000
export const guest = createInstanceGuest();
export const auth = createInstanceAuth("auth");
//port 14000 java
export const guestJavaApi = createInstanceGuestJava("");
// baseUrl: 14000/api/com
export const ComCUDApi = createInstanceJava("api/com");
// baseUrl: 14000/api/lms
export const LmsCUDApi = createInstanceJava("api/lms");

// Mocking server api
export const Mock = createInstanceMockServer("");
