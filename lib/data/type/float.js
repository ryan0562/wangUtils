import {isNil} from "lodash";

/**
 * 保留小数位数
 * @param value 值
 * @param dec 小数位数
 * @param divisor 倍数
 * @param defaultValue 无数据时返回值
 */
export function fixNumber (value, dec = 2, divisor = 1, defaultValue = '--') {
  if (isNil(value) || Number.isNaN(+value)) {
    return defaultValue;
  }
  return (+value / divisor).toFixed(dec);
}
