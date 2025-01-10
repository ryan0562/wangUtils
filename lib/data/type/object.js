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

/**
 * 将源对象中的非空属性赋值给目标对象
 * @param {Object} target - 目标对象，属性将被赋值到这个对象上
 * @param {...Object} sources - 一个或多个源对象，其非空属性将被复制到目标对象
 * @returns {Object} - 最终的目标对象，包含了所有源对象中的非空属性
 */
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


/**
 * 深度将源对象中的属性覆盖给目标对象,lodash.merge
 * @param {Object} target - 目标对象，属性将被深度覆盖到这个对象上
 * @param {...Object} sources - 一个或多个源对象
 * @returns {Object} - 深度合并了所有属性的最终目标对象
 */
export function deepAssign (object, ...sources) {
  // 如果没有要合并的源对象，直接返回目标对象
  if (sources.length === 0) {
    return object;
  }
  // 遍历所有源对象
  sources.forEach(source => {
    if (source == null) {
      return;
    }

    // 遍历源对象的所有属性
    Object.keys(source).forEach(key => {
      const objValue = object[key];
      const srcValue = source[key];

      // 如果属性是对象且不是null，则递归合并
      if (typeof srcValue === 'object') {
        object[key] = merge(Array.isArray(srcValue) ? [] : {}, objValue, srcValue);
      } else {
        // 否则直接赋值
        object[key] = srcValue;
      }
    });
  });

  return object;
}


