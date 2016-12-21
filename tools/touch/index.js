/**
 * @desc 简单封装的移动端手势库
 * @param  {obj} obj DOM 对象
 * @param  {string} type 事件名称 [tap, longTap, swipeLeft, swipeRight, swipeTop, swipeDown]
 * @param  {Function} cb   事件回调函数
 */
window.touch = function (obj, type, cb) {
  var init = {
    x: 7,
    y: 7,
    sx: 0,
    sy: 0,
    ex: 0,
    ey: 0
  }
  var sTime = 0
  var eTime = 0
  type = type.toLowerCase()

  obj.addEventListener('touchstart', function (event) {
    sTime = new Date().getTime()
    init.sx = event.targetTouches[0].pageX
    init.sy = event.targetTouches[0].pageY
    init.ex = init.sx
    init.ey = init.sy
    if (type.indexOf('start') !== -1) {
      cb()
    };
  }, false)

  obj.addEventListener('touchmove', function (event) {
    event.preventDefault()
    init.ex = event.targetTouches[0].pageX
    init.ey = event.targetTouches[0].pageY
    if (type.indexOf('move') !== -1) {
      cb()
    }
  }, false)

  obj.addEventListener('touchend', function () {
    var changeX = init.sx - init.ex
    var changeY = init.sy - init.ey
    if (Math.abs(changeX) > Math.abs(changeY) && Math.abs(changeY) > init.y) {
      if (changeX > 0) {
        if (type.indexOf('left') !== -1) cb()
      } else {
        if (type.indexOf('right') !== -1) cb()
      }
    } else if (Math.abs(changeY) > Math.abs(changeX) && Math.abs(changeX) > init.x) {
      if (changeY > 0) {
        if (type.indexOf('top') !== -1) cb()
      } else {
        if (type.indexOf('down') !== -1) cb()
      }
    } else if (Math.abs(changeX) < init.x && Math.abs(changeY) < init.y) {
      eTime = new Date().getTime()
      if ((eTime - sTime) > 300) {
        if (type.indexOf('long') !== -1) cb() // 长按
      } else {
        if (type.indexOf('tap') !== -1) cb() // 当点击处理
      }
    }
    if (type.indexOf('end') !== -1) cb()
  })
}
