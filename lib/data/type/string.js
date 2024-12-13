/**
 * 字符串 类型操作
 * @module data/type/string
 */


import {isNil} from "lodash";

/**
 * 将数字转换为百分比格式
 * @param {number} value - 要转换的数字
 * @param {number} dec - 小数位数，默认为 1
 * @param {string} defaultValue - 如果 value 为无效值，则返回的默认值，默认为 '--'
 * @returns {string} - 格式化后的百分比字符串
 */
export function fixPercentage (value, dec = 1, defaultValue = '--') {
  if (_.isNil(value) || Number.isNaN(+value) || (typeof value === 'string' && value.length === 0)) {
    return defaultValue;
  }
  const n = (+value).toFixed(dec);
  return `${n}%`;
}

/**
 * 金额格式化，例如 1,100,000.23
 * @param {number} value - 要格式化的金额
 * @param {number} dec - 小数位数，默认为 2
 * @returns {string} - 格式化后的金额字符串
 */
export function amountFormat (value, dec) {
  const s = Number(value).toFixed(dec);
  const l = s.split(".")[0].split("").reverse()
  const r = '.' + s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }

  const reStr = dec === 0 ?
    t.split("").reverse().join("") :
    t.split("").reverse().join("") + r
  return reStr;
}

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
 * 格式化银行卡号，目前规则为 4 个字符加一个空格
 * @param {string} bankCardCode - 要格式化的银行卡号
 * @returns {string} - 格式化后的银行卡号
 */
export function fomartBankCardCode (bankCardCode) {

  //遍历账户
  let spaceStr = "";
  for (let i = 0, len = bankCardCode.length; i < len; i++) {
    //每4个字符加一个空格
    if (i % 4 === 0) {
      spaceStr += " " + bankCardCode[i];
    } else {
      spaceStr += bankCardCode[i];
    }
  }
  return spaceStr;
}

/**
 * 毫秒转 天时分秒
 * @param {number} n - 要转换的毫秒数
 * @returns {string} - 转换后的时间字符串
 */
export function changeMoneyToChinese (n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 将整数转换为中文
 * @param {number} value - 要转换的整数
 * @returns {string} - 转换后的中文字符串
 */
export function intToChinese (value) {
  const str = String(value);
  const len = str.length - 1;
  const idxs = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千', '亿'];
  const num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  return str.replace(/([1-9]|0+)/g, ($, $1, idx, full) => {
    let pos = 0;
    if ($1[0] !== '0') {
      pos = len - idx;
      if (idx == 0 && $1[0] == 1 && idxs[len - idx] == '十') {
        return idxs[len - idx];
      }
      return num[$1[0]] + idxs[len - idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
        pos = left - left % 4;
      }
      if (pos) {
        return idxs[pos] + num[$1[0]];
      } else if (idx + $1.length >= len) {
        return '';
      } else {
        return num[$1[0]]
      }
    }
  });
}

/**
 * 金额格式化方法  只有万元
 * @param {number} value - 要格式化的金额
 * @param {number} k - 单位转换的基数，默认为 10000
 * @returns {Object} - 包含格式化后金额和单位的对象
 */
export function numberFormat (value, k = 10000) {
  if (!value) {
    return {
      value: 0,
      unit: '元',
    }
  }
  var param = {}
  var sizes = ['元', '万元', '亿元', '万亿元']
  if (value < k) {
    param.value = toFixed(value)
    param.unit = '元'
  } else {
    let i = Math.floor(Math.log(value) / Math.log(k))
    param.value = ((value / Math.pow(k, i))).toFixed(2)
    param.unit = sizes[i]
  }
  return param
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
export function getKebabCase (str)  {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

/**
 * 将字符串转换为 camelCase 格式
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function getCamelCase  (str)  {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase())
}

/**
 * 将字符串转换为全角字符
 * @param {string} str - 要转换的字符串
 * @returns {string} - 转换后的字符串
 */
export function toCDB  (str)  {
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
export function toDBC (str)  {
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



