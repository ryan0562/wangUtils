/**
 * 获取指定名称的 cookie 值
 * @param {string} cname - 要获取的 cookie 名称
 * @returns {string} - 获取到的 cookie 值，如果没有找到则返回空字符串
 */
export function getCookie(cname) {
  var name = cname + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
