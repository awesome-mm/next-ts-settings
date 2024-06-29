"use client";
import {useState} from "react";
import {useCallback} from "react";

// 정규식으로 검사할 타입을 작성
export const regExp = {
  VIDEO: /mp4|mov|wmv|3gp|flv|avi|mpg|mpeg|mpe|asf|asx|rm|mkv|webm|ogg|ogv|yuv|amv|m4p|m4v/g,
  IMAGE: /jpg|jpeg|png|gif|bmp/g,
  USERID:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /^01[016789][0-9]{3,4}[0-9]{4}$/,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*()_+\-={}|,./?`~]{8,16}$/,
  NUMBER: /^[0-9]+$/,
  NAME: /^[가-힣ㄱ-ㅎa-zA-Z0-9]+$/,
  SEARCH: /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]+$/,
};

/**
 * @example const { errors, validate } = useValidation();
 * validate('USERID', emailValue);
 * validate('PASSWORD', passwordValue);
 *
 * errors.USERID && (<p>이메일 에러임 ㄷㄷ</p>)
 * @returns
 *  1. validate() 함수의 retrun {boolean} 값 -- isValid 값을 반환
 *  2. errors 객체 반환 - 유효하지 않은 값
 *
 *    errors = {
 *     ...type : !isValid,
 *    }
 *
 *    errors = {
 *     USERID : true,  // => 이메일 에러
 *    }
 */
const useValidation = () => {
  const [errors, setErrors] = useState({});

  const validate = useCallback((type, value) => {
    // console.log(`유효성 검사 타입: ${type}, 값: ${value}`);
    const regex = regExp[type];

    if (!regex) {
      console.log(`regExp에 없는 값임 ${type}`);
      return false;
    }

    const isValid = regex.test(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: !isValid,
    }));

    // console.log(`유효성 검사 결과: ${isValid}`);

    return isValid;
  }, []);

  return {errors, validate};
};

export default useValidation;
