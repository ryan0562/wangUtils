import axios from 'axios';


import WangStorageProxy from '@lib/data/storage/WangStorage.js';
import {deepAssign} from "@lib/data/type/object.js";


// 1. 配置常用默认值
// 2. 避免code!==200时错误重复编写

function showResState (state) {
  const codeMap = {
    400: '请求错误(400)',
    401: '未授权，请重新登录(401)',
    403: '拒绝访问(403)',
    404: '请求出错(404)',
    500: '服务器错误(500)',
    501: '服务未实现(501)',
    502: '网络错误(502)',
    503: '服务不可用(503)',
  };

  const message = codeMap[state] || `连接出错(${state})!`;
  return `${message}，请检查网络或联系网站管理员！`;
}

// 默认业务成功判断函数
function defaultBusinessSuccessJudgment (data) {
  return data.code === 200
}

// 默认错误处理事件
function rejectEvent (config, data, error) {
  // if (error) console.error(error);
  if (config.businessRejectEvent) config.businessRejectEvent({data, error});
  return Promise.reject({data, error});
}


class superAxiosClass {
  constructor (config = {}) {
    this.WangStorage = new WangStorageProxy(localStorage);
    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      }
    }
    // 深度覆盖配置
    this.effectConfig = deepAssign({}, defaultConfig, config);

    this.init = axios.create(this.effectConfig);
    // 添加请求拦截器
    this.init.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么 添加 token 等鉴权功能
        return config;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      },
    );

    // 添加响应拦截器
    this.init.interceptors.response.use(
      (res) => {
        const {status, data} = res;
        // 业务判断函数
        const businessResolve = this.effectConfig.businessResolve || defaultBusinessSuccessJudgment
        
        if (businessResolve(data)) {
          return data;
        }

        return rejectEvent(this.effectConfig, data, null)
      },
      (error) => {

        // 对响应错误做点什么
        return rejectEvent(this.effectConfig, null, error)
      },
    );

    return this.init
  }
}

export default superAxiosClass;

// // 无特殊需求的只需使用这个一个对象即可 公共 header 可在此配置, 如需多个实例 可按照此方式创建多个进行导出
// export const Axios = new superAxiosClass({
//   headers: {
//     Authorization: 111,
//   },
// });