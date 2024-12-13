/**
 * 导出浏览器相关的工具函数
 * @module _browser
 */
export * as _browser from "./browser/index.js";

/**
 * 获取浏览器信息
 * @returns {Object} 包含浏览器类型和版本的对象
 */
export function getExplorerInfo  ()  {
  let t = navigator.userAgent.toLowerCase();
  return 0 <= t.indexOf("msie") ? { //ie < 11
    type: "IE",
    version: Number(t.match(/msie ([\d]+)/)[1])
  } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
    type: "IE",
    version: 11
  } : 0 <= t.indexOf("edge") ? {
    type: "Edge",
    version: Number(t.match(/edge\/([\d]+)/)[1])
  } : 0 <= t.indexOf("firefox") ? {
    type: "Firefox",
    version: Number(t.match(/firefox\/([\d]+)/)[1])
  } : 0 <= t.indexOf("chrome") ? {
    type: "Chrome",
    version: Number(t.match(/chrome\/([\d]+)/)[1])
  } : 0 <= t.indexOf("opera") ? {
    type: "Opera",
    version: Number(t.match(/opera.([\d]+)/)[1])
  } : 0 <= t.indexOf("Safari") ? {
    type: "Safari",
    version: Number(t.match(/version\/([\d]+)/)[1])
  } : {
    type: t,
    version: -1
  }
}

/**
 * 判断当前设备是否为移动设备
 * @returns {string} 如果是移动设备，返回'mobile'，否则返回'desktop'
 */
export function isMobile () {
  if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * 判断当前浏览器是否为IE
 * @returns {boolean} 如果是IE，返回true，否则返回false
 */
export function isIE() {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * 获取操作系统类型
 * @returns {string} 操作系统类型，如'windows'或'mac'
 */
export function osType  ()  {
  const agent = navigator.userAgent.toLowerCase();
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  const isWindows = agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0 || agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0;
  if (isWindows) {
    return "windows";
  }
  if(isMac){
    return "mac";
  }
}

/**
 * 获取浏览器类型
 * @returns {string} 浏览器类型，如'weixin'或'QQ'，如果不是微信或QQ浏览器，则返回false
 */
export function broswer  () {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return "weixin";
  } else if (ua.match(/QQ/i) == "qq") {
    return "QQ";
  }
  return false;
}

/**
 * 判断当前设备是否为苹果移动设备
 * @returns {boolean} 如果是苹果移动设备，返回true，否则返回false
 */
export function isAppleMobileDevice () {
  let reg = /iphone|ipod|ipad|Macintosh/i;
  return reg.test(navigator.userAgent.toLowerCase());
}

/**
 * 获取当前设备的DPI（每英寸点数）
 * @returns {Array} 包含水平和垂直DPI的数组
 */
export function getDPI(){
  var arrDPI = new Array;
  // IE支持此属性
  if (window.screen.deviceXDPI) {
    arrDPI[0] = window.screen.deviceXDPI;
    arrDPI[1] = window.screen.deviceYDPI;
  } else {
    var tmpNode = document.createElement("DIV");
    tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
    document.body.appendChild(tmpNode);
    arrDPI[0] = parseInt(tmpNode.offsetWidth);
    arrDPI[1] = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
  }

  return arrDPI;
}

/**
 * 获取A4纸在屏幕中的像素宽高
 * @returns {Object} 包含A4纸像素宽度和高度的对象
 */
function getA4PixelSize() {
  var deviceXDPI = this.getDPI()[0];
  var a4_PixelWidth = 210 / 25.4 * deviceXDPI;
  var a4_PixelHeight = 297 / 25.4 * deviceXDPI;

  return {
    width: a4_PixelWidth,
    height: a4_PixelHeight
  };
}
