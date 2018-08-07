fakeData()
//模拟一个假的后台,可①函数提升
function fakeData() {
    // **？：**我在想这个函数的作用域，以及闭包
    let book = {
        name: 'JavaScript 高级程序设计',
        number: 2,
        id: 1
    }

    axios.interceptors.response.use(function (response) {
        console.log('拦截响应')
        console.log(response)
        //这个congfig的数据来自我们的请求
        let {
            config: {
                method,
                url,
                data
            }
        } = response
        console.log(data)
        console.log(method)
        if (url === '/books/1' && method === 'get' && data=== undefined) {
            console.log('没有data的get')
            response.data = book
        } else if (url === '/books/1' && method === 'get' && data) {
            console.log('有data的get')
            data = JSON.parse(data)
            console.log(data)
            Object.assign(book, data)
            response.data = book
        }
        return response
    })
}

let model = {
    data: {
        name: '',
        number: 0,
        id: ''
    },
    fetch(id) {
        return axios.get(`/books/${id}`).then((response) => {
            this.data = response.data
            return response
        })
    },
    update(data) {
        // **？：**这里给个数data.id为何意啊？
        console.log(this)
        console.log(2)
        let id = this.data.id
        console.log(data)
        // **？：**这里为啥发生了两次get请求？
        // **✔：**这个{data:data}可以简写成，也可以改为{xxxx:data}上传参数
        //        这个参数的值是JSON格式的字符串对象→☞"{"number":3}"
        return axios.get(`/books/${id}`,{
            data: data
        })
        .then((response) => {
            console.log(3)
            console.log(`hello`)
            console.log(response)
            console.dir(response)
            this.data = response.data
            return response
        })
    }
}

let view = {
    el: '#app',
    template: `
    <div>
        书名：《__name__》
        数量：<span id="number">__number__</span>
    </div>
    <div>
        <button id="addOne">加一</button>
        <button id="minusOne">减一</button>
        <button id="reset">归零</button>
    </div>
    `,
    render(data) {
        let html = this.template.replace('__name__', data.name)
            .replace('__number__', data.number)

        $(this.el).html(html)
    }
}

let controller = {
    init(options) {
        let view = options.view
        let model = options.model
        this.view = view
        this.model = model
        this.view.render(this.model.data)
        this.bindEvents()
        this.model.fetch(1).then(() => {
            this.view.render(this.model.data)
        })
    },
    // **？：**为何不需要事件委托了
    addOne() {
        console.log(1)
        console.log(this)
        var oldNumber = $('#number').text() //string
        var newNumber = oldNumber - 0 + 1
        this.model.update({
            number: newNumber
        }).then(() => {
            console.log()
            console.log(this.model.data)
            this.view.render(this.model.data)
        }, () => {
            console.log('加不了')
        })
    },
    minusOne() {
        var oldNumber = $('#number').text() //string
        var newNumber = oldNumber - 0 - 1
        this.model.update({
            number: newNumber
        }).then(() => {
            console.log(4)
            this.view.render(this.model.data)
        })
    },
    reset() {
        console.log('reset-1')
        this.model.update({
            number: 0
        }).then(() => {
            this.view.render(this.model.data)
        })
    },
    bindEvents() {
        // this === controller
        // **？：**话说这里的bind的作用是把这个this指定为controller吗？不然其肚子里this是啥？——jQuery作者决定的
        console.log(this)
        $(this.view.el).on('click', '#addOne', this.addOne.bind(this))
        $(this.view.el).on('click', '#minusOne', this.minusOne.bind(this))
        // **✔：**当你把这个'#reset'改成'#addOne'后，你会发现，它们执行了两遍
        $(this.view.el).on('click', '#reset', this.reset.bind(this))
    }

}

controller.init({
    view: view,
    model: model
})