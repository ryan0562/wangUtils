/**
 * url、路由操作
 * @module device/browser/url
 */

/**
 * 从 URL 中获取指定查询字符串的值
 * @param {string} name - 要获取的查询字符串的名称
 * @returns {string|null} - 查询字符串的值，如果未找到则返回 null
 */
export function getQuery(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * 解析 URL 中的查询参数并返回一个对象
 * @returns {Object} - 包含查询参数的对象
 */
export function resolveURLParameters() {
  let url = location.search;
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {};
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });
  return paramsObj;
};

/**
 * 将对象转换为 URL 参数字符串
 * @param {Object} obj - 要转换的对象
 * @returns {string} - URL 参数字符串
 */
export function ob2Params(obj) {
  let params = [];
  for (let key in obj) {
    params.push(`${key}=${obj[key]}`);
  }
  return encodeURIComponent(params.join('&'));
}

/**
 * 替换 URL 中的指定参数值
 * @param {string} paramName - 要替换的参数名称
 * @param {string} replaceWith - 替换后的参数值
 * @returns {string} - 替换后的 URL
 */
export function replaceQuery(paramName, replaceWith) {
  const oUrl = location.href.toString();
  const re = eval('/(' + paramName + '=)([^&]*)/gi');
  location.href = oUrl.replace(re, paramName + '=' + replaceWith);
  return location.href;
}

/**
 * 从 URL 中删除指定参数
 * @param {string} name - 要删除的参数名称
 * @returns {string} - 删除指定参数后的 URL
 */
export function removeURLParameters(name) {
  const baseUrl = location.origin + location.pathname + "?";
  const query = location.search.substr(1);
  if (query.indexOf(name) > -1) {
    const obj = {};
    const arr = query.split("&");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    delete obj[name];
    return baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
  }
}
