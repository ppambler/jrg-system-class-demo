# 任务说明

## ★「05-10」C32-DOM事件

- 讲解的轮播懂了个30%，需要找时间回顾
- 根据「一次事件点击测试」写一篇blog，其中「target」和「currentTarget」遇到了坑
  - [e.target与e.currentTarget的区别](https://www.jianshu.com/p/1dd668ccc97a)
- 「点击浮层的CSS-demo」懂了个50%
- DOM事件的可视化操作

## ★「05-13」C33-JSONP是什么鬼

- 用代码实现 frank.com:8001 和 jack.com:8002 之间的 JSONP 请求
  - 准备一个后台运行的demo「`server.js`」
  - 前端：写一个首页，对某些操作添加事件，如button点击后实现某个区域的局部刷新
  - 后台：处理请求路径，为请求方响应需要的数据
  - 测试：修改hosts，添加两个域名映射`127.0.0.1 frank.com`和 `127.0.0.1 jack.com`
- 注意：
  - `server.js`修改了就得重启服务器，其它引用的文件不需要
  - 动态创建的script必须成为body的儿子才行，而img则不需要，没有那么多为什么，就是试出来的，就像是给了你很多东西，组合出啥东西来？创造这些东西的人也不知道……
  - 动态创建的script的请求是异步的，script先添加监听，然后执行响应的demo，执行完后即加载完后就移除0动态创建的script

## ★「05-14」C34-AJAX是什么鬼

- AJAX的处理过程：
  - 使用 XMLHttpRequest 发请求
  - 服务器返回 XML 格式的字符串
  - JS 解析 XML，并更新局部页面
- XML并不友好，如「糟糕的API的使用」；于是服务器大多返回的是JSON格式的字符串「访问[JSON](http://json.org/json-zh.html)的官网，认为那种铁轨图用于展现其语法极其有味道」
- JSON和JavaScript是两门语言，其中JSON抄袭了JavaScript，所以你懂的，请不要混淆了……
- JSONP可以跨域，而AJAX由于同源策略的原因不能直接跨域
- 让AJAX跨域？即突破同源策略的封锁，那么请使用CORS「跨站资源共享」的方式

ps：一个不恰当的比喻「男生参观女方的房子，请求要看女生的闺房，用于刷新自己脑海中的yy，女生回复拒绝，因为不是自己的女闺蜜，除非你是她的男朋友」这里的「男生→☞浏览器；女生→☞服务器；成为男朋友？→☞必须有这个响应头 `Access-Control-Allow-Origin:'男生的地址'` 如：`http://frank.com:8888` 」
