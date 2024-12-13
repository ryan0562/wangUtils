

import * as _data from "./data/index.js";
import * as _device from "./device/index.js";
import * as _position from "./position/index.js";
import {default as WangStorage} from "./data/storage/WangStorage.js";


// 命名导出
export {
  _data,
  _device,
  _position,
  WangStorage,
};

// 将整个对象作为默认导出
export default {
  _data,
  _device,
  _position,
  WangStorage,
};
