
// const axios = require('axios');

//模拟一个假的后台

let book = {
    name: 'JavaScript 高级程序设计',
    number: 2,
    id: 1
}

axios.interceptors.response.use(function(response) {
    console.log('拦截响应')
    let {config: {method,url,data}} = response

    if(url === '/books/1' && method === 'get') {
        response.data = book
    } else if(url === '/books/1' && method === 'get' && data) {
        Object.assign(book,data)
    }
    return response
})

// 发送ajax请求了
axios.get('/books/1')
    .then(({data})=>{
        console.log(data)
        let originalHtml = $('#app').html()
        let newHtml = originalHtml.replace('__name__',data.name)
            .replace('__number__',data.number)
        $('#app').html(newHtml)
    })
   
//事件委托
// 加法

$('#app').on('click','#addOne',function(){
    var oldNumber = $('#number').text() //string
    // console.log(1+oldNumber)
    var newNumber = oldNumber-0+1
    console.log(newNumber)
    axios.get('/books/1',{
        number:newNumber
    },{
        headers: {
            token: `http-test`
        }
    }).then(()=>{
        $('#number').text(newNumber)
    })
})
// 减法
$('#app').on('click','#minusOne',function(){
    var oldNumber = $('#number').text() //string
    var newNumber = oldNumber-0-1
    axios.get('/books/1',{
        number:newNumber
    }).then(()=>{
        $('#number').text(newNumber)
    })
})
// 清空为0
$('#app').on('click','#reset',function(){
    axios.get('/books/1',{
        number:0
    }).then(()=>{
        $('#number').text(0)
    })
})