

import * as _data from "./data/index.js";
import * as _device from "./device/index.js";
import * as _position from "./position/index.js";
import {default as WangStorage} from "./data/storage/WangStorage.js";

import superAwait from "@lib/request/superAwait.js";
import superAxios from "@lib/request/superAxios.js";




// 命名导出
export {
  _data,
  _device,
  _position,
  WangStorage,
  superAwait,
  superAxios,
};

// 将整个对象作为默认导出
export default {
  _data,
  _device,
  _position,
  WangStorage,
  superAwait,
  superAxios,
};
