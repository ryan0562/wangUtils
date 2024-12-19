/**
 * 对象 类型操作
 * @module data/type/object
 */

import {get} from 'lodash';
import {isEmpty} from '@lib/data/index.js';


/**
 * 根据路径读取对象属性
 * @param {Object} ob - 要读取属性的对象
 * @param {string} path - 属性路径，例子：'a[0].b.c'
 * @param {any} defaultVal - 如果值为空值、空对象、空集合，空映射或者set 返回默认值，则返回的默认值
 * @returns {any} - 属性值或默认值
 */
export function readPropOnPath (ob, path, defaultVal = '') {
  const value = get(ob, path);
  return emptyDefault(value, defaultVal)
}

/**
 * 处理空值默认值
 * @param {any} value - 要处理的值
 * @param {any} defaultVal - 如果值为空值、空对象、空集合，空映射或者set 返回默认值，则返回的默认值
 * @returns {any} - 值或默认值
 */
export function emptyDefault (value, defaultVal = '') {
  if (isEmpty(value)) return defaultVal;
  return value
}

export function nonEmptyAssign (target, ...sources) {
  sources.forEach(source => {
    if (source !== null && source !== undefined && typeof source === 'object') {
      Object.keys(source).forEach(key => {
        const value = source[key];
        if (!isEmpty(value)) {
          target[key] = source[key];
        }
      });
    }
  });
  return target;
}


