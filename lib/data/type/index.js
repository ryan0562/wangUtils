/**
 * 数据类型操作
 * @module data/type
 * @see module:data/type/array
 * @see module:data/type/file
 * @see module:data/type/number
 * @see module:data/type/object
 * @see module:data/type/string
 * @see module:data/type/date
 */


export * as _array from "./array.js";
export * as _file from "./file.js";
export * as _number from "./number.js";
export * as _object from "./object.js";
export * as _string from "./string.js";
export * as _date from "./date.js";

/**
 * 获取数据类型
 * @param {any} value - 要获取类型的值
 * @returns {string} - 值的数据类型
 */
export function getType (value) {
  if (value === null) {
    return value + "";
  }
  // 判断数据是引用类型的情况
  if (typeof value === "object") {
    let valueClass = Object.prototype.toString.call(value),
      type = valueClass.split(" ")[1].split("");
    type.pop();
    return type.join("").toLowerCase();
  } else {
    // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
}






