export function mapToArray (map, nameKey = "label", valueKey = "value") {
  //缺少一个map为非for循环值的判断
  const reval = []
  for (const key in map) {
    const label = map[key];
    reval.push({
      [nameKey]: label,
      [valueKey]: key,
    })
  }
  return reval
}

// 数组乱序
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
 * @description: 扁平化数组
 * @param: value:值
 * @author: Waker
 */
function flatArray(array: any[], childrenKey = "children", _level = 0) {
  _level = _level + 1
  return array.reduce((total: any[], item: any) => {
    total.push({
      ...item,
      _level,
    })
    // 是否有子菜单，并递归处理
    if (item[childrenKey]?.length > 0) {
      total.push(...flatArray(item[childrenKey], childrenKey, _level))
    }
    return total
  }, [])
}

/**
 * @description:  根据option扁平化树
 * @param: data:array=数据，childrenKey=子节点的key，option：string[]=需要导出的字段集合
 * @author: Waker
 */
function flatArrayToOption({ data, childrenKey = "children", options }: any) {
  return data.reduce((total: any[], item: any) => {
    const it: any = {}
    options.forEach((key: any) => {
      it[key] = item[key]
    });
    total.push(it)
    // 是否有子菜单，并递归处理
    if (item[childrenKey]?.length > 0) {
      total.push(...flatArrayToOption({ data: item[childrenKey], options }))
    }
    return total
  }, [])
}

/**
 * @description:  将树的某个key组成数组取出
 * @param: data:array=数据，childrenKey=子节点的key，key：string=需要取出的key,filterMethod:Boolean = 过滤方法,返回假值会过滤掉
 * @author: Waker
 */
function flatArrayToKey({ data, childrenKey = "children", key, filterMethod }: any) {
  return data.reduce((total: any[], item: any) => {
    // 是否有过滤条件
    if (filterMethod) {
      if (typeof (filterMethod) !== 'function') {
        throw 'filterMethod必须是个函数'
      }
      const isOK = filterMethod(item)
      if (isOK) {
        total.push(item[key])
      }
    } else {
      total.push(item[key])
    }
    // 是否有子菜单，并递归处理
    if (item[childrenKey]?.length > 0) {
      total.push(...flatArrayToKey({ data: item[childrenKey], key, filterMethod }))
    }
    return total
  }, [])
}


