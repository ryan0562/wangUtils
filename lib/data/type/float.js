import {isNil} from "lodash";

/**
 * 保留小数位数
 * @param {number} value - 要格式化的数字
 * @param {number} dec - 要保留的小数位数，默认为 2
 * @param {number} divisor - 用于除 value 的除数，默认为 1
 * @param {string} defaultValue - 如果 value 为 null 或 NaN，则返回的默认值，默认为 '--'
 * @returns {string} - 格式化后的数字字符串
 */
export function fixNumber (value, dec = 2, divisor = 1, defaultValue = '--') {
  if (isNil(value) || Number.isNaN(+value)) {
    return defaultValue;
  }
  return (+value / divisor).toFixed(dec);
}
