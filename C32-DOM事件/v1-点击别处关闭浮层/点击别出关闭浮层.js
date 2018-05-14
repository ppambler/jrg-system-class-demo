// 写出一个点开浮层、关闭浮层的例子，要求

// 点击按钮弹出浮层
// 点击别处关闭浮层
// 点击浮层时，浮层不得关闭
// 再次点击按钮，浮层消失

var flag = 1
  clickMe.addEventListener('click', function () {
    if(flag) {
          popover.style.display = 'block'
          flag = 0
          onetime(document,'click',hide)
    } else {
      popover.style.display = 'none'
      flag = 1
    }
    
  })

wrapper.addEventListener('click', function (e) {
  e.stopPropagation()
})

function onetime(node, type, callback) {

  // 创建事件
  node.addEventListener(type, function (e) {
    // 移除事件
    e.currentTarget.removeEventListener(e.type, arguments.callee);
    // 调用处理器
    return callback(e);
  });
}

function hide(e) {
  // alert('hello')
  console.log(1)
  popover.style.display = 'none'
  flag = 1
}