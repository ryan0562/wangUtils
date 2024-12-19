/**
 * array数据操作
 * @module data/type/array
 * @alias 数组操作
 */

/**
 * 将对象映射为数组
 * @param {Object} map - 要映射的对象
 * @param {string} nameKey - 数组项中名称的键，默认为 "label"
 * @param {string} valueKey - 数组项中值的键，默认为 "value"
 * @returns {Array} - 映射后的数组
 */
export function mapToArray(map, nameKey = "label", valueKey = "value") {
  // 缺少一个map为非for循环值的判断
  const reval = [];
  for (const key in map) {
    const label = map[key];
    reval.push({
      [nameKey]: label,
      [valueKey]: key,
    });
  }
  return reval;
}

/**
 * 打乱数组顺序
 * @param {Array} array - 要打乱的数组
 * @returns {Array} - 打乱后的数组
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index j such that 0 <= j <= i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indexes i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * 扁平化数组
 * @param {Array} array - 要扁平化的数组
 * @param {string} childrenKey - 子数组的键名，默认为 "children"
 * @param {number} _level - 当前层级，默认为 0
 * @returns {Array} - 扁平化后的数组
 */
function flatArray(array, childrenKey = "children", _level = 0) {
  _level = _level + 1;
  return array.reduce((total, item) => {
    total.push({
      ...item,
      _level,
    });
    // 是否有子菜单，并递归处理
    if (item[childrenKey]?.length > 0) {
      total.push(...flatArray(item[childrenKey], childrenKey, _level));
    }
    return total;
  }, []);
}

/**
 * 根据选项扁平化树
 * @param {Array} data - 数据数组
 * @param {string} childrenKey - 子节点的键名，默认为 "children"
 * @param {string[]} options - 需要导出的字段集合
 * @returns {Array} - 扁平化后的选项数组
 */
function flatArrayToOption({ data, childrenKey = "children", options }) {
  return data.reduce((total, item) => {
    const it = {};
    options.forEach((key) => {
      it[key] = item[key];
    });
    total.push(it);
    // 是否有子菜单，并递归处理
    if (item[childrenKey]?.length > 0) {
      total.push(...flatArrayToOption({ data: item[childrenKey], options }));
    }
    return total;
  }, []);
}

/**
 * 将树的某个键组成数组取出
 * @param {Array} data - 数据数组
 * @param {string} childrenKey - 子节点的键名，默认为 "children"
 * @param {string} key - 需要取出的键名
 * @param {Function} filterMethod - 过滤方法，返回假值会过滤掉
 * @returns {Array} - 提取后的键值数组
 */
function flatArrayToKey({ data, childrenKey = "children", key, filterMethod }) {
  return data.reduce((total, item) => {
    // 是否有过滤条件
    if (filterMethod) {
      if (typeof (filterMethod) !== 'function') {
        throw 'filterMethod必须是个函数';
      }
      const isOK = filterMethod(item);
      if (isOK) {
        total.push(item[key]);
      }
    } else {
      total.push(item[key]);
    }
    // 是否有子菜单，并递归处理
    if (item[childrenKey]?.length > 0) {
      total.push(...flatArrayToKey({ data: item[childrenKey], key, filterMethod }));
    }
    return total;
  }, []);
}
