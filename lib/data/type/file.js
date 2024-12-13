/**
 * 文件数据、流、二进制等类型操作
 * @module data/type/file
 */

/**
 * 验证图片尺寸是否符合指定的宽度和高度
 * @param {Object} file - 要验证的图片文件
 * @param {number} width - 图片的期望宽度
 * @param {number} height - 图片的期望高度
 * @returns {Promise} - 当图片尺寸符合要求时，解析为图片文件；否则，拒绝并返回错误信息
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
