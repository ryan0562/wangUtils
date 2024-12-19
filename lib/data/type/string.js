/**
 * 字符串 类型操作
 * @module data/type/string
 */

/**
 * 隐私字段用*转换，例如 aaaa****bbbb
 * @param {string} value - 要转换的字符串
 * @param {number} before - 保留前面的字符数
 * @param {number} after - 保留后面的字符数
 * @returns {string} - 格式化后的字符串
 */
export function hideString (value, before, after) {
  if (!value) {
    return;
  }
  value = String(value);
  let beforeStr = value.substr(0, before);
  let afterStr = after ? value.substr(-after) : '';
  let hideLen = value.length - before - after;

  let reVal = beforeStr + '*'.repeat(hideLen) + afterStr;
  return reVal; //将格式化后的字符串输出到前端显示
}

/**
 * 将字符串的首字母转换为大写
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function fistLetterUpper (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * 将字符串转换为 kebab-case 格式
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function getKebabCase (str) {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

/**
 * 将字符串转换为 camelCase 格式
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function getCamelCase (str) {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase())
}

/**
 * 将字符串转换为全角字符
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function toCDB (str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

/**
 * 将字符串转换为半角字符
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function toDBC (str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248);
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}




