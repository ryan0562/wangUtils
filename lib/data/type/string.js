

export function fixPercentage(value, dec = 1, defaultValue = '--') {
  if (_.isNil(value) || Number.isNaN(+value) || (typeof value === 'string' && value.length === 0)) return defaultValue;
  const n = (+value).toFixed(dec);
  return `${n}%`;
}


/*
 * @description: 金额格式化 例如1,100,000.23
 * @param: value:金额 dec：小数点后位数
 * @author: Waker
 */
export function amountFormat(value, dec) {
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

/*
 * @description: 隐私字段用*转换 例如aaaa****bbbb
 * @param: value:文本
 * @author: Waker
 */
export function hideString(value, before, after) {
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
 *  格式化银行卡号 目前规则为 4个字符加一个空格
 *
 *  @param bankCardCode   银行卡号
 */
export function fomartBankCardCode(bankCardCode) {

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
 * @param mss
 * @return {string}
 */
function changeMoneyToChinese(n) {
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
  return head + s.replace(/(零.)*零元/, '元')
  .replace(/(零.)+/g, '零')
  .replace(/^整$/, '零元整');
}

export const intToChinese = (value) => {
  const str = String(value);
  const len = str.length-1;
  const idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
  const num = ['零','一','二','三','四','五','六','七','八','九'];
  return str.replace(/([1-9]|0+)/g, ( $, $1, idx, full) => {
    let pos = 0;
    if($1[0] !== '0'){
      pos = len-idx;
      if(idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
        return idxs[len-idx];
      }
      return num[$1[0]] + idxs[len-idx];
    } else {
      let left = len - idx;
      let right = len - idx + $1.length;
      if(Math.floor(right / 4) - Math.floor(left / 4) > 0){
        pos = left - left % 4;
      }
      if( pos ){
        return idxs[pos] + num[$1[0]];
      } else if( idx + $1.length >= len ){
        return '';
      }else {
        return num[$1[0]]
      }
    }
  });
}

/**
 * 金额格式化方法  只有万元
 * @param {*} value //要格式化的值
 * @param {*} pos //小数点位数
 */
export function numberFormat(value, k = 10000) {
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

export const fistLetterUpper = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getKebabCase = (str) => {
  return str.replace(/[A-Z]/g, (item) => '-' + item.toLowerCase())
}

export const getCamelCase = (str) => {
  return str.replace( /-([a-z])/g, (i, item) => item.toUpperCase())
}

export const toCDB = (str) => {
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

export const toDBC = (str) => {
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


