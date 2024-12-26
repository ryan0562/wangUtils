/**
 * 时间、日期 类型操作
 * @module data/type/date
 */


/**
 * 函数接收一个日期作为参数，并返回一个字符串
 * @param {Date|String} date 需要计算时间间隔的日期
 * @param {String|number} diff 差值小于多少显示为'刚刚'，单位：秒
 * @return String
 */
export function timeIntervalFormat (date, {diff = 0}={}) {
  // 检查`diff`是否为数字
  if (isNaN(diff)) {
    console.error('传入的`刚刚`差值不正确', date);
    return ''
  }
  // 定义时间单位和对应的毫秒数（使用近似值）
  const timeUnits = [
    {label: '年', milliseconds: 365 * 24 * 60 * 60 * 1e3}, // 平均每年
    {label: '个月', milliseconds: 30 * 24 * 60 * 60 * 1e3}, // 平均每月
    {label: '天', milliseconds: 24 * 60 * 60 * 1e3}, // 每天
    {label: '小时', milliseconds: 60 * 60 * 1e3}, // 每小时
    {label: '分钟', milliseconds: 60 * 1e3}, // 每分钟
    {label: '秒', milliseconds: 1e3}, // 每秒
  ];


  // 将传入的日期转换为Date对象，并计算与当前时间的差值（以毫秒为单位）
  const dateObj = new Date(date);
  // 如果解析失败，返回空字符串
  if (isNaN(dateObj.getTime())) {
    console.error('传入的日期无效', date);
    return ''
  }

  const now = Date.now();
  const isFuture = dateObj > now;
  let diffMilliseconds = Math.abs(now - dateObj);

  // 时间差小于diff时，返回'刚刚'
  if (diffMilliseconds <= diff * 1e3) {
    return '刚刚';
  }

  // 遍历时间单位，找到第一个满足条件的时间单位并格式化输出
  for (const unit of timeUnits) {
    if (diffMilliseconds >= unit.milliseconds) {
      const value = Math.floor(diffMilliseconds / unit.milliseconds);
      if (!isNaN(value)) {
        return isFuture ? `未来${value}${unit.label}` : `${value}${unit.label}前`;
      }
    }
  }

  return '';
}
