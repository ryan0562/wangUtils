import { isEmpty, get } from 'lodash';
/**
 * @description: 路径取值： 空值、空对象、空集合，空映射或者set 返回默认值
 * @param: ob：对象，路径：在ob内的路径,例子：'a[0].b.c'，defaultVal：默认值
 * @author: Waker
 */
export function readProp(ob, path, defaultVal = '') {
  const value = get(ob, path);
  return emptyDefault(value, defaultVal)
}

/**
 * @description: 空值默认 ： 空值、空对象、空集合，空映射或者set 返回默认值
 * @param: value:值，defaultVal：默认值
 * @author: Waker
 */
export function emptyDefault(value, defaultVal = '') {
  // 空值
  if (!value && value !== 0) return defaultVal;
  // 空对象、空集合，空映射或者set
  if (value instanceof Object && isEmpty(value)) return defaultVal;
  return value
}
