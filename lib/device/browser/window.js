/**
 * 滚动到页面顶部
 * 该函数会平滑地将页面滚动到顶部
 */
export function scrollToTop() {
  const height = document.documentElement.scrollTop || document.body.scrollTop;
  if (height > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, height - height / 8);
  }
}

/**
 * 滚动到页面底部
 * 该函数会将页面滚动到最底部
 */
export function scrollToBottom() {
  window.scrollTo(0, document.documentElement.clientHeight);
}

/**
 * 平滑滚动到指定元素
 * @param {string} element - 要滚动到的元素的选择器
 * 该函数会平滑地将页面滚动到指定元素的位置
 */
export function smoothScroll(element) {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};

/**
 * 获取客户端高度
 * @returns {number} - 客户端的高度
 * 该函数会返回当前文档的客户端高度
 */
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  } else {
    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}

/**
 * 获取页面视口宽度
 * @returns {number} - 页面视口的宽度
 * 该函数会返回当前文档的页面视口宽度
 */
export function getPageViewWidth() {
  return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}

/**
 * 进入全屏模式
 * 该函数会将当前文档切换到全屏模式
 */
export function toFullScreen() {
  let element = document.body;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

/**
 * 退出全屏模式
 * 该函数会退出当前文档的全屏模式
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * 处理滚动事件
 * @param {function} callback - 滚动事件的回调函数
 * 该函数会在页面滚动时触发回调函数，并传递滚动方向
 */
export function handleScrollHeader(callback) {
  let timer = 0;

  let beforeScrollTop = window.pageYOffset;
  callback = callback || function() {};
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let direction = 'up';
        const afterScrollTop = window.pageYOffset;
        const delta = afterScrollTop - beforeScrollTop;
        if (delta === 0) {
          return false;
        }
        direction = delta > 0 ? 'down' : 'up';
        callback(direction);
        beforeScrollTop = afterScrollTop;
      }, 50);
    },
    false
  );
}

/**
 * 新窗口下载文件
 * @param {string} url - 文件的下载链接
 * @param {string} name - 文件的名称
 * 该函数会在新窗口中下载指定的文件
 */
export function newWindowDownload(url, name) {
  const a = document.createElement('a');
  const isSupportDownload = 'download' in a;

  if (isSupportDownload) {
    a.href = url;
    if (name) {
      a.download = name;
    }
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else {
    window.open(url);
  }
}

/**
 * 获取浏览器信息
 * @returns {Object} - 包含浏览器类型和版本的对象
 * 该函数会返回当前浏览器的类型和版本信息
 */
export function getExplorerInfo () {
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
  };
};
