/**
 * 函数接收一个日期作为参数，并返回一个字符串
 * @param {Date|String} date 需要计算时间间隔的日期
 * @return String
 */
export function timeIntervalFormat(date) {
  let t, p, l = [
    { n: '年', s: 3600 * 24 * 365 * 1e3 },
    { n: '个月', s: 3600 * 24 * 30 * 1e3 },
    { n: '天', s: 3600 * 24 * 1e3 },
    { n: '小时', s: 3600 * 1e3 },
    { n: '分钟', s: 60 * 1e3 },
    { n: '秒', s: 1 * 1e3 },
    { n: '刚刚', s: 0 }
  ];
  t = Date.now() - new Date(date || Date.now()).getTime()

  // 考虑传入的并不是一个可以被Date对象解析的日期字符串，避免错误影响程序运行
  if (Number.isNaN(t)) return ''
  if (t === 0) return l.find(e => e.s === t).n;

  t < 0 ? ((p = !!t), (t = -t)) : (p = !1)

  for (let i = 0; i < l.length; i++) {
    const { n, s } = l[i]
    if (s === 0) return '刚刚'
    else if (t >= s) {
      const v = Math.floor(t / s)
      return p ? `未来${v}${n}` : `${v}${n}前`;
    }
  }
}
