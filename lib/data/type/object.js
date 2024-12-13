import { isEmpty, get } from 'lodash';
/**
 * 读取对象属性
 * @param {Object} ob - 要读取属性的对象
 * @param {string} path - 属性路径，例子：'a[0].b.c'
 * @param {any} defaultVal - 如果值为空值、空对象、空集合，空映射或者set 返回默认值，则返回的默认值
 * @returns {any} - 属性值或默认值
 */
export function readProp(ob, path, defaultVal = '') {
  const value = get(ob, path);
  return emptyDefault(value, defaultVal)
}

/**
 * 处理空值默认值
 * @param {any} value - 要处理的值
 * @param {any} defaultVal - 如果值为空值、空对象、空集合，空映射或者set 返回默认值，则返回的默认值
 * @returns {any} - 值或默认值
 */
export function emptyDefault(value, defaultVal = '') {
  // 空值
  if (!value && value !== 0) return defaultVal;
  // 空对象、空集合，空映射或者set
  if (value instanceof Object && isEmpty(value)) return defaultVal;
  return value
}


