/**
 * 数据
 * @Module data
 * @see module:data/storage
 * @see module:data/type
 */

export * as _storage from "./storage/index.js";
export * as _type from "./type/index.js";


/**
 * 判断是否为逻辑意义上的空值。包含：null、undefined、空对象、空数组、空字符串、空映射、空集合
 * @param {Object} value - 需要判断的值
 * @returns {Boolean} - 是否为空值
 */
export function isEmpty (value) {
  // 检查布尔、数字
  if (typeof value === 'boolean' || typeof value === 'number') {
    return false;
  }
  // 检查了 null 和 undefined，空字符串
  if (!value) {
    return true;
  }

  // 判断空对象
  if (value.constructor === Object && Object.keys(value).length === 0) {
    return true;
  }

  //判断空数组
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  // 判断空映射、空集合
  if ((value instanceof Map || value instanceof Set) && value.size === 0) {
    return true;
  }

  return false;
}
