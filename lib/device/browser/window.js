/**
 * 浏览器窗口、标签页操作
 * @module device/browser/window
 */

/**
 * 滚动到页面顶部
 * 该函数会平滑地将页面滚动到顶部
 */
export function scrollToTop () {
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
export function scrollToBottom () {
  window.scrollTo(0, document.documentElement.clientHeight);
}

/**
 * 平滑滚动到指定元素
 * @param {string} element - 要滚动到的元素的选择器
 * 该函数会平滑地将页面滚动到指定元素的位置
 */
export function smoothScroll (element) {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};

/**
 * 获取客户端高度
 * @returns {number} - 客户端的高度
 * 该函数会返回当前文档的客户端高度
 */
export function getClientHeight () {
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
export function getPageViewWidth () {
  return (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth;
}

/**
 * 进入全屏模式
 * 该函数会将当前文档切换到全屏模式
 */
export function toFullScreen () {
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
export function exitFullscreen () {
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
export function handleScrollHeader (callback) {
  let timer = 0;

  let beforeScrollTop = window.pageYOffset;
  callback = callback || function () {};
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
export function newWindowDownload (url, name) {
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
 * 将JSON数据保存为文件
 *
 * @param {Object|string} data - 要保存的数据，可以是对象或JSON字符串
 * @param {string} [filename='json.json'] - 保存的文件名，默认为'json.json'
 */
export function saveJSON (data, filename) {
  if (!data) {
    alert('保存的数据为空');
    return;
  }
  if (!filename) filename = 'json.json';
  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }
  let blob = new Blob([data], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}

/**
 * post 请求下载 二进制文件
 * @param {string} url - 文件的下载链接
 * @param {string} params - body参数
 */
export async function postDownload (url, params) {
  try {
    const requestOptions = {
      body: JSON.stringify(params),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }

    //full  url
    const fullUrl = url
    const response = await fetch(fullUrl, requestOptions)
    const filename = response.headers.get('content-disposition').split(';')[1].split('=')[1]
    const blob = await response.blob()

    const link = document.createElement('a')
    link.download = decodeURIComponent(filename)
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  } catch (error) {
    console.error('下载出错')
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

/*
* 函数生成采样点，跳过中心点并生成垂直、水平、对角线和反对角线的采样点
*
* */
const getSamplePoints = (numSamples = 9) => {
  const points = [];
  const centerIndex = Math.floor(numSamples / 2) + 1;
  const widthPart = window.innerWidth / (numSamples + 1);
  const heightPart = window.innerHeight / (numSamples + 1);
  for (let i = 1; i <= numSamples; i++) {
    if (i === centerIndex) {
      continue; // 跳过中心点
    }
    points.push([centerIndex * widthPart, i * heightPart]); // 垂直采样
    points.push([i * widthPart, centerIndex * heightPart]); // 水平采样
    points.push([i * widthPart, i * heightPart]); // 对角线采样
    points.push([(numSamples - i + 1) * widthPart, i * heightPart]); // 反对角线采样
  }
  points.push([centerIndex * widthPart, centerIndex * heightPart]);
  return points;
};

/*
* 函数检查元素是否为无效元素
* */
const checkInvalidElement = (ele) => {
  // 自定义无效元素规则
  if (!["BODY", "HTML"].includes(ele.tagName) && ele.id !== "app") {
    return 0;
  }
  return 1;
};

/*
* 函数通过采样点获取页面元素，并统计无效元素占比，若超过80%则判定为白屏
* */
export function detectWhiteScreen () {
  // IE不兼容，直接返回
  if (!document.elementsFromPoint) {
    return;
  }
  const points = getSamplePoints();

  // 无效元素计数
  let invalidCount = 0;

  for (let i = 0; i < points.length; i++) {
    const ele = document.elementsFromPoint(points[i][0], points[i][1]);
    invalidCount += checkInvalidElement(ele[0]);
  }

  // 采样点无效元素占比80%以上，判定为白屏
  if (invalidCount / points.length > 0.8) {
    return true
  }

  return false
};


