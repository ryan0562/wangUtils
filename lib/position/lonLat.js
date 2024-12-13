/**
 * wgs84坐标转火星坐标(偏差坐标）
 * @param {float} wgLon wgs经度
 * @param {float} wgLat wgs纬度
 * @return {Array} 加了偏差后的坐标
 */
export function convertLonLatToGCJ (wgLon, wgLat) {
  var a = 6378245.0;
  var ee = 0.00669342162296594323;
  var mgLat, mgLon;
  if (util.outOfChina(wgLon, wgLat)) {
    mgLon = wgLon;
    mgLat = wgLat;
    return;
  }
  var dLat = util.transformLat(wgLon - 105.0, wgLat - 35.0);
  var dLon = util.transformLon(wgLon - 105.0, wgLat - 35.0);
  var radLat = wgLat / 180.0 * Math.PI;
  var magic = Math.sin(radLat);
  magic = 1 - ee * magic * magic;
  var sqrtMagic = Math.sqrt(magic);
  dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
  dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);
  mgLat = wgLat + dLat;
  mgLon = wgLon + dLon;
  return [mgLon, mgLat];
}

/**
 * 墨卡托坐标转纬度函数
 * @param {Number} x 横坐标
 * @param {Number} y 纵坐标
 * @return {Number} 纬度
 */
export function transformLatx (x, y) {
  var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

/**
 * 墨卡托坐标转经度函数
 * @param {Number} x 横坐标
 * @param {Number} y 纵坐标
 * @return {Number} 经度
 */
export function transformLon (x, y) {
  var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
  return ret;
}
