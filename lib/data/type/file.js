/**
 * @description: 校验图片尺寸
 * @param:
 * @author: Waker
 */

export function validateImageSize({ file, width, height }) {
  if (!file|| !height || !width) {
    console.error('校验图片尺寸时,文件、宽、高必填');
    return file;
  }
  return new Promise(function (resolve, reject) {
    const _URL = window.URL || window.webkitURL;
    const image = new Image();
    image.onload = function () {
      const valid = image.width == width && image.height == height;
      valid ? resolve(valid) : reject();
    };
    image.src = _URL.createObjectURL(file);
  })
  .then(() => {
    return file;
  })
  .catch(() => {
    return Promise.reject(`上传图片尺寸必须为800*800`);
  });
}

/**
 * blob类型转换到dataURL数据
 * @param {Object} blob
 * @param {Function} callback 转换完成后回调方法，参数：转换后的结果
 */
export function blobToDataURL (blob, callback) {
  var a = new FileReader();
  a.onload = function (e) {
    callback(e.target.result);
  }
  a.readAsDataURL(blob);
}
