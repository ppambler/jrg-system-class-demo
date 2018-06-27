window.jQuery = function () {
    // ……
}

window.$ = window.jQuery

// 参数值用了ES6语法——解构赋值
window.jQuery.ajax = function ({url,method,body,headers}) {
    // 请记住下面这行，请记住我……虽然再见必须说……请记住我……眼泪不要坠落……
    return new Promise(function(resolve,reject) {
        let request = new XMLHttpRequest()
        request.open(method, url)
        // 遍历头
        for(let key in headers) {
            let value = headers[key]
            request.setRequestHeader(key,value)
        }
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined, request.responseText)
                } else if (request.status >= 400) {
                    // 难道回调函数只能接收一个参数？？？
                    reject(request,'为什么你不能看到我')
                }
            }
        }
        request.send(body)
    })  
}


myButton1.addEventListener('click', (e) => {
    // 用有结构的数据作为参数，如对象，这样一来，你就不会忘记「之前写的这个值是什么含义了」
    window.jQuery.ajax({
            url: '/xxx',
            method: 'get',
            body: undefined,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'gg': 'good game'
            }
        }
    ).then(
        (responseText) => {
            console.log(responseText)
            return 'success'
        },
        (request,xxx) => {
            console.log(request)
            console.log(xxx)
            // 感觉很奇怪，调用某个形参的某个属性，万一我传的是一个字符串、数值呢？？？
            // 结果并没有报错，这些简单类型经过包装，变成一个对象，然后发现没有属性，就打印了undefined
            console.log(request.responseText)
            return 'fail'
        }
    ).then(
        (xxx) => {
            console.log(xxx)
            console.log(`我是第二个then，不管第一次成功与否，只要第一次的经历没有报错，你就会看到这段文字，而不是第二段文字`)
        },
        (yyy) => {
            console.log(yyy)
            console.log(`我是第二个then，我是第二段文字，你能看到我吗？我想不能吧！！！`)
        }
    )
})

myButton2.addEventListener('click',(e)=> {
    window.jQuery.ajax({
        url:'yyy',
        method: 'get',
        body: undefined,
        headers: null
    }).then((responseText)=> {
        console.log(responseText)
        return 'success'
    },(request,zzz) => {
        console.log(request)
        console.log(request.responseText)
        console.log(zzz)
        return 'fail'
    })
})