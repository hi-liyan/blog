/**
 * 计算指定日期距离今天的天数
 * @param past 过去日期 示例：2020-08-17
 * @returns {number} 天数
 */
export const calThePastToToday = (past: string) => {
  const s1 = new Date(past.replace(/-/g, "/"));
  const s2 = new Date(); // 当前日期：2021-10-18
  const days = s2.getTime() - s1.getTime();
  const time = Number(days / (1000 * 60 * 60 * 24));
  return time
}

/**
 * 计算指定日期距离今天的天数
 * @param past 过去日期 示例：2020-08-17
 * @returns {string} 天数 如 1年零20天
 */
export const calThePastToTodayOptString = (past: string) => {
  const time = calThePastToToday(past)
  const years = Math.floor(time / 365)
  const days = Math.ceil(time % 365)
  return (years > 0 ? (days > 0 ? (years + '年零') : (years + '年')) : null) + (days > 0 ? (days + '天') : null)
}