// JWT를 파싱하는 함수

/**@desc 매개변수로 전달받은 accessToken을 파싱하여 반환
 * */
export const parseJWT = (token: string) => {
  try {
    // 들어오는 토큰 값 확인
    // console.log("parseJWT : ", token);

    // JWT를 '.'을 기준으로 세 부분으로 분리
    // eslint-disable-next-line
    const [header, payload, signature] = token.split(".");
    // console.log("jwt header", header + "signature", signature);

    // Base64 디코딩하여 페이로드 얻기 - btoa() 인코딩 , atob() 디코딩
    const decodedPayload = decodeURIComponent(
      atob(payload)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    // JSON 형태로 변환하여 payload 파싱하기
    const payloadParseData = JSON.parse(decodedPayload);
    // console.log("페이로드 파싱", payloadParseData);

    return JSON.parse(payloadParseData.data); // "data" 값을 JSON 객체로 변환 (cNo, cName 포함)
  } catch (error) {
    console.error("JWT 파싱 오류, 유저 정보 파싱 실패 :", error);
    return {};
  }
};
