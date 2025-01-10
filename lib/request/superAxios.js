import axios from 'axios'


const defaultConfig = {
  timeout: 5000,
}

class superAxiosClass {
  constructor (config, reqInterceptor, onRejected) {
    this.config = config;
    this.instance = axios.create(this.config);
    this.onRejected = onRejected;
    //请求拦截器
    this.instance.interceptors.request.use(reqInterceptor);
    // 响应拦截器
    this.instance.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
  }

  handleError (error) {
    if (this.onRejected) {
      return this.onRejected(error);
    }

    return Promise.reject(error);
  }

  handleResponse (response) {
    return response;
  }
}


export function createSuperAxiosInstance (config, reqInterceptor, onRejected) {
  const apiInstance = new superAxiosClass({...defaultConfig, ...config}, reqInterceptor, onRejected);
  return apiInstance.instance;
}

const api = createSuperAxiosInstance({
  timeout: 1000,
  validateStatus: function (status) {
    return status === 200; // 默认值
  },
  transformResponse: [function (res) {
    if(res.data!==200){
      return [data];
    }
  }],

});


