
# WangStorage

``` js     
// 创建 LocalStorageProxy 实例
const ls = new wangStorageProxy(localStorage,{
    prefix: 'wang',
});

/* 监听用法 */

// 只有当前标签页能触发
window.addEventListener('wangStorageChange', function(event) {
console.log('wangStorageChange');
});

// 只有其他标签页能触发
window.addEventListener('storage', function(event) {
console.log('storage');
});

```
