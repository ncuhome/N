# touch

简单封装的移动端手势库

# use

```html
<script src="ncuhome-fe-n/tool/touch/index.js"></script>
<script>
  var domObj = document.querySelector('#myDom')
  var type = 'tap' // type can use tap, longTap, swipeLeft, swipeRight, swipeTop, swipeDown
  touch(domObj, type, function () {
    console.log('test')
  })
</script>
```
