import axios from 'axios';
import {deepAssign} from "@lib/data/type/object.js";


/**
 * 默认业务成功判断函数
 * @param {Object} data - 响应数据
 * @returns {boolean} - 如果业务成功返回 true，否则返回 false
 */
function defaultBusinessSuccessJudgment (data) {
  return data.code === 200;
}

/**
 * 默认错误处理事件
 * @param {Object} config - 配置对象
 * @param {Object} data - 响应数据
 * @param {Error} error - 错误对象
 * @returns {Promise} - 返回一个被拒绝的 Promise
 */
function rejectEvent (data = {}, error = {}) {
  const config = data.config || error.config;

  // Reject前置钩子存在则触发
  if (config.beforeRejectHooks) {
    config.beforeRejectHooks({data: data.data, error});
  }

  return Promise.reject({data, error});
}

/**
 * 扩展的 Axios 类，包含默认配置和拦截器
 * @class superAxiosClass
 * @param {Object} config - 扩展配置对象，axiosConfig的超集
 * @param {Function} config.resolveConditions - 业务判断函数：接口请求成功后，业务判断条件函数；默认值：（）=> code===200
 * @param {Function} config.beforeRejectHooks - 错误处理前置钩子：接口请求失败 或 业务判断条件为false时，都会在promise.reject前触发
 *
 */
class superAxiosClass {
  /**
   * 构造函数
   * @constructor
   * @param {Object} config - 自定义配置对象
   */
  constructor (config = {}) {
    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
    };

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
      }
    );

    // 添加响应拦截器
    this.init.interceptors.response.use(
      (res) => {
        const {status, data, config} = res;

        // 判断函数
        const resolveConditions = config.resolveConditions || defaultBusinessSuccessJudgment;
        if (resolveConditions(data)) {
          return data;
        }

        return rejectEvent(res, null);
      },
      (error) => {
        // 对响应错误做点什么
        return rejectEvent(null, error);
      }
    );

    return this.init;
  }
}

export default superAxiosClass;
