/**
 * # WangStorageProxy 类，用于包装 localStorage 或 sessionStorage 对象
 * 提供添加前缀、序列化和反序列化数据以及事件监听的功能
 * @class WangStorageProxy
 * @param {Object} storage - 存储对象， localStorage | sessionStorage
 * @param {Object} options - 配置对象
 * @param {string} options.prefix - 存储数据时添加的前缀
 * @returns {proxy} 代理对象
 *
 * @example
 * // 创建 LocalStorageProxy 实例
 * const ls = new WangStorageProxy(localStorage);
 *
 * // 只有当前标签页能触发
 * window.addEventListener('wangStorageChange', function (event) {
 *   console.log('wangStorageChange');
 * });
 *
 * // 只有其他标签页能触发
 * window.addEventListener('storage', function (event) {
 *   console.log('storage');
 * });
 *
 */
export default class WangStorageProxy {
  constructor (storage, {prefix = ''} = {}) {
    if (!storage instanceof Storage) {
      console.error('代理对象必须为Storage对象')
      return null
    }
    this._storage = storage;
    this._wrappedFunctions = [];
    this._prefix = prefix;
    const instance = new Proxy(this._storage, this.getHandler())
    return instance;
  }

  // 抽离 Reflect.get 的逻辑到单独的方法
  _reflectGet (obj, prop, ifUsePrefix = true) {
    const usePrefix = ifUsePrefix ? this._prefix : '';
    return Reflect.get(obj, `${usePrefix}_${prop}`);
  }

  // 抽离 Reflect.set 的逻辑到单独的方法
  _reflectSet (obj, prop, value, ifUsePrefix = true) {
    const usePrefix = ifUsePrefix ? this._prefix : '';
    return Reflect.set(obj, `${usePrefix}_${prop}`, value);
  }

  // 添加删除逻辑的方法
  _reflectDelete (obj, prop, ifUsePrefix = true) {
    const usePrefix = ifUsePrefix ? this._prefix : '';
    return Reflect.deleteProperty(obj, `${usePrefix}_${prop}`);
  }

  // 触发事件
  _dispatchEvent ({key, oldValue, newValue}) {
    const event = new Event('wangStorageChange');
    event.key = key;
    event.oldValue = oldValue;
    event.newValue = newValue;
    window.dispatchEvent(event);
  }

  getHandler () {
    return {
      get: (obj, prop) => {
        if (prop === 'getItem') {
          return (key, ifUsePrefix) => {
            const val = this._reflectGet(obj, key, ifUsePrefix);
            try {
              return JSON.parse(val); // 尝试解析 JSON 数据
            } catch (e) {
              return val; // 如果解析失败，则直接返回原始值
            }
          };
        }

        if (prop === 'setItem') {
          return (key, value, ifUsePrefix) => {
            if (typeof key === 'symbol' || typeof value === 'symbol') {
              console.error('WangStorageProxy=>不能设置 Symbol 类型的键或值');
              return;
            }
            try {
              const newValue = JSON.stringify(value);
              const oldValue = this._reflectGet(obj, key, ifUsePrefix);

              // 触发事件
              this._dispatchEvent({key, oldValue, newValue});

              // 赋值
              this._reflectSet(obj, key, newValue, ifUsePrefix);

              return newValue;
            } catch (e) {
              console.error('wangStorage=>设置应用缓存出错：', e);
            }
          };
        }

        if (prop === 'removeItem') {
          return (key, ifUsePrefix) => {
            const oldValue = this._reflectGet(obj, key, ifUsePrefix);

            // 触发事件
            this._dispatchEvent({key, oldValue, newValue: null});

            this._reflectDelete(obj, key, ifUsePrefix);
          };
        }

        /**
         * 清除前缀开头的数据
         * @method clear
         * @param {Boolean} [ifUsePrefix] - 可选参数，是否只清理前缀。 默认值：true
         */
        if (prop === 'clear') {
          return (ifUsePrefix = true) => {

            // 触发事件
            this._dispatchEvent({key: null, oldValue: null, newValue: null});

            // 不使用前缀，就直接清理所以
            if (!ifUsePrefix) {
              this._storage.clear();
              return
            }

            // 默认使用前缀，只清理前缀相关key
            for (const key in obj) {
              if (key.indexOf(this._prefix) === 0) {
                Reflect.deleteProperty(obj, key);
              }
            }
          };
        }

        // 源函数逻辑
        const original = Reflect.get(obj, prop);
        if (typeof original === 'function') {
          // 缓存函数本身，减少构造时产生的消耗
          if (!this._wrappedFunctions[prop]) {
            this._wrappedFunctions[prop] = (...args) =>
              Reflect.apply(original, obj, args);
          }
          return this._wrappedFunctions[prop];
        }

        return this._reflectGet(obj, prop);
      },
    };
  }
}
