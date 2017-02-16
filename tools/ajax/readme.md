# A promise style ajax

## use

可以直接在浏览器中引入 dist/ajax.min.js，也支持 CommonJs 模块规范引入。

## example

```html
<script src="ajax.min.js"></script>
<script>
  window.ajax = promiseAjax(configObj)
  ajax.get('/api/token').then(data => {
    <!-- your code -->
  }).cache(e => {
    <!-- your code -->
  })
</script>
```
#### or

```javascript
import promiseAjax from 'ajax.min.js'
const ajax = promiseAjax(configObj)
ajax.get('/api/token').then(data => {
    <!-- your code -->
  }).cache(e => {
    <!-- your code -->
  })
```

## configObj

ajax的顶级配置项
```javascript
  {
    baseUrl: 'String'，
    headers: 'Object'
  }
```
