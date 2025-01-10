/**
 * superAwait，返回一个数组，第一个元素是错误对象（如果有的话），第二个元素是 Promise 的结果。
 * @param {Promise} promise - 需要处理的 Promise 对象。
 * @param {Object} [errorExt] - 可选的错误扩展对象，如果 Promise 被拒绝，此对象的属性将被合并到错误对象中。
 * @returns {Promise<Array>} - 返回一个 Promise，其结果是一个数组，第一个元素是错误对象（如果没有错误则为 null），第二个元素是 Promise 的结果（如果没有结果则为 undefined）。
 *
 * @example
 * const [err, res = {}] = await this.superAwait(configTemplateSave(postData));
 * if (err) {
 *  //await错误处理
 *  this.$message.error(res.message || err.message);
 *  return;
 * }
 * //await成功处理...
 */
export default function superAwait (promise, errorExt) {
  return promise
  .then(function (data) { return [null, data]; })
  .catch(function (err) {
    if (errorExt) {
      Object.assign(err, errorExt);
    }
    return [err, undefined];
  });
}
