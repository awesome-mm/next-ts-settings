import {
  format,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

/**
 * @namespace filters
 * @description 필터 모음
 */

export default {
  /**
   * @function date
   * @description 날짜 포멧팅
   * @param {string} originDate 원본 Date 포멧
   * @param {string} [type = yMDHMS] 변결할 포멧 타입
   * @example date(new Date().toISOString, 'yMDHM'); - filter.date(item?.c_date, "yMDHM")
   * @returns {string} filtered
   * @memberof filters#
   */

  date: (originDate: string, type = "yMDHMS") => {
    try {
      let formated;
      switch (type) {
        case "YMD":
          formated = format(new Date(originDate), "yyyy.MM.dd");
          break;
        case "yMD":
          formated = format(new Date(originDate), "yy.MM.dd");
          break;
        case "YMDHM":
          formated = format(new Date(originDate), "yyyy.MM.dd HH:mm");
          break;
        case "yMDHM":
          formated = format(new Date(originDate), "yy.MM.dd HH:mm");
          break;
        case "YMDHMS":
          formated = format(new Date(originDate), "yyyy.MM.dd HH:mm:ss");
          break;
        case "yMDHMS":
          formated = format(new Date(originDate), "yy.MM.dd HH:mm:ss");
          break;
        case "YMDHMSF":
          formated = format(new Date(originDate), "yyyy.MM.dd HH:mm:ss.SSS");
          break;
        case "yMDHMSF":
          formated = format(new Date(originDate), "yy.MM.dd HH:mm:ss.SSS");
          break;
      }
      return formated ? formated : "";
    } catch (error) {
      return "";
    }
  },

  /**
   * @function timeDiff
   * @description 기준 시간을 받아 현재로 부터 얼마나 차이나는지(절대값) 표시
   * @param {Date} date 기준 날짜
   * @example timeDiff(new Date());
   * @returns {string} 연, 월, 일, 시간, 분 별의 시간차 표시
   * @memberof filters
   */

  timeDiff: (date: string) => {
    try {
      const now = Date.now();
      const DBDate = format(new Date(date), "yyyy-MM-dd");
      // console.log("DBDay", DBDay);

      const diffYears = Math.abs(differenceInYears(now, DBDate));
      const diffMonths = Math.abs(differenceInMonths(now, DBDate));
      const diffDays = Math.abs(differenceInDays(now, DBDate));
      const diffHours = Math.abs(differenceInHours(now, date));
      const diffMinutes = Math.abs(differenceInMinutes(now, date));

      if (diffYears > 0) {
        return `${diffYears}년`;
      } else if (diffMonths > 0) {
        return `${diffMonths}개월 전`;
      } else if (diffDays > 0) {
        return `${diffDays}일 전`;
      } else if (diffHours > 0) {
        return `${diffHours}시간 전`;
      } else if (diffMinutes > 0) {
        return `${diffMinutes}분 전`;
      } else {
        return "방금";
      }
    } catch (error) {
      return "";
    }
  },

  /**
   * @function comma
   * @description 숫자 세자리 콤마
   * @param {number | string} amount 변경할 수
   * @param {number} [float = 4] maximumFractionDigits
   * @example comma(300000000.25005814536, 8);
   * @returns {string} filtered
   * @memberof filters#
   */

  comma(amount: string, float = 4) {
    const parsedAmount = parseFloat(amount);
    return !isNaN(parsedAmount) ? parsedAmount.toLocaleString(undefined, {maximumFractionDigits: float}) : NaN;
  },
};
