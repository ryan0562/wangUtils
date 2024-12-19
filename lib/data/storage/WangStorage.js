/**
 * # WangStorageProxy 类，用于包装 localStorage 或 sessionStorage 对象
 * 提供添加前缀、序列化和反序列化数据以及事件监听的功能
 * @class WangStorageProxy
 * @param {Object} storage - 存储对象，可以是 localStorage 或 sessionStorage
 * @param {Object} options - 配置对象
 * @param {string} options.prefix - 存储数据时添加的前缀
 *
 * @example
 * // 创建 LocalStorageProxy 实例
 * const ls = new wangStorageProxy(localStorage);
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
    this._storage = storage;
    this._wrappedFunctions = [];
    this._prefix = prefix;
    return new Proxy(this._storage, this.getHandler());
  }

  // 抽离 Reflect.get 的逻辑到单独的方法
  _reflectGet (obj, prop) {
    return Reflect.get(obj, `${this._prefix}${prop}`);
  }

  // 抽离 Reflect.set 的逻辑到单独的方法
  _reflectSet (obj, prop, value) {
    return Reflect.set(obj, `${this._prefix}${prop}`, value);
  }

  // 添加删除逻辑的方法
  _reflectDelete (obj, prop) {
    return Reflect.deleteProperty(obj, `${this._prefix}${prop}`);
  }

  getHandler () {
    return {
      get: (obj, prop) => {
        if (prop === 'getItem') {
          return (key) => {
            const val = this._reflectGet(obj, key);
            try {
              return JSON.parse(val); // 尝试解析 JSON 数据
            } catch (e) {
              return val; // 如果解析失败，则直接返回原始值
            }
          };
        }

        if (prop === 'setItem') {
          return (key, value) => {
            if (typeof key === 'symbol' || typeof value === 'symbol') {
              console.error('WangStorageProxy=>不能设置 Symbol 类型的键或值');
              return;
            }
            try {
              const newValue = JSON.stringify(value);
              const oldValue = this._reflectGet(obj, key);

              // 触发事件
              const event = new Event('wangStorageChange');
              event.key = key;
              event.oldValue = oldValue;
              event.newValue = newValue;
              window.dispatchEvent(event);

              // 赋值
              this._reflectSet(obj, key, newValue);

              return newValue;
            } catch (e) {
              console.error('wangStorage=>设置应用缓存出错：', e);
            }
          };
        }

        if (prop === 'removeItem') {
          return (key) => {
            const oldValue = this._reflectGet(obj, key);

            const event = new Event('wangStorageChange');
            event.key = key;
            event.oldValue = oldValue;
            event.newValue = null; // 被删除，所以新值为null
            window.dispatchEvent(event);

            this._reflectDelete(obj, key);
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

/*************************用法********************/


