// * 이벤트 최적화 - lodash lib를 참고하고 사용해도 됨. 같은 원리임다

type AnyFunction = (...args: any[]) => void;

/**
 * @description - 매우 빈번한 함수 호출을 제한 - resize, scroll에 등 사용
 * 특정 시간 간격 동안 이벤트가 여러 번 발생하더라도 "지정된 시간 간격으로 함수를 실행"
 * @param {AnyFunction} func  - fn
 * @param { number } limit - ms
 * @returns {AnyFunction} callbackFunc 제한된 콜백 함수
 * @example 
 * const handleScroll = throttle(() => {
  console.log('Scrolled');
  }, 100);

  window.addEventListener('scroll', handleScroll);
 */
export const throttle = (func: AnyFunction, limit: number): AnyFunction => {
  let inThrottle: boolean = false;

  return function (this: any, ...args: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * @description - 매우 빈번한 함수 호출을 제한 - resize , input 등 
 * 연속된 이벤트 호출이 끝난 후 일정 시간 동안 "추가 호출이 없을 때 함수를 실행"
 * @param {AnyFunction} func  - fn
 * @param { number } wait - ms
 * @returns {AnyFunction} callbackFunc 제한된 콜백 함수
 * @example 
 * 
 * 1.resize
 * const handleResize = debounce(() => {
  console.log('Resized');
}, 200);

window.addEventListener('resize', handleResize);

 2.input
 const handleInputState = useCallback(
   debounce((value) => {
     setInputState(value);
   }, 200),[]);
 */
export const debounce = (func: AnyFunction, wait: number): AnyFunction => {
  let timeout: NodeJS.Timeout | null;

  return function (this: any, ...args: any[]) {
    const context = this;
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
