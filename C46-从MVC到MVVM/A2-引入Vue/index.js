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
        if (url === '/books/1' && method === 'get' && data === undefined) {
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

// 面向对象写成MVC类
function Model(options) {
    this.data = options.data
    //  **？：**设置这个为何何意啊？
    this.resource = options.resource
}
// **？：**这是添加原型的最佳写法?
Model.prototype.fetch = function (id) {
    console.log(this.resource)
    return axios.get(`/${this.resource}/${id}`).then((response) => {
        this.data = response.data
        return response
    })
}
Model.prototype.update = function (data) {
    let id = this.data.id
    let resource = this.resource
    return axios.get(`/${resource}/${id}`, {
            data: data
        })
        .then((response) => {
            // **？：**这个不写也可以，竟然没有报错！难道它自动更新view的book
            // console.log(3)
            // console.log(`hello`)
            // console.log(response)
            // console.dir(response)
            // console.log(this)
            // this.data = response.data
            // return response
        })
}

// 以下就是面向对象了
// **？：**话说为啥不用Controller类？
let model = new Model({
    data: {
        name: '',
        number: 0,
        id: ''
    },
    resource: 'books'
})

let view = new Vue({
    el: '#app',
    data: {
        book: {
            name: '加载中',
            number: 0,
            id: ''
        },
        n: 1
    },
    template: `
    <div>
        <div>
            书名：《{{book.name}}》
            数量：<span id="number">{{book.number}}</span>
        </div>
        <div>
            <input v-model="n" />
            N的值是{{n}}
        </div>
        <div>
            <button v-on:click="addOne">加N</button>
            <button v-on:click="minusOne">减N</button>
            <button v-on:click="reset">归零</button>
        </div>
    </div>
    `,
    created() {
        model.fetch(1).then(() => {
            console.log('我是初始化')
            console.log(this.book)
            this.book = model.data
        })
    },
    methods: {
        addOne() {
            console.log(1)
            console.log(this)
            model.update({
                number: this.book.number + (this.n - 0)
            }).then(() => {
                // **？：**这里报错了，这个this是啥，明明报错了，可运算结果却没有错，即使不写也没事啊！
                // this.view.book = this.model.data

            }, () => {
                console.log('加不了')
            })
        },
        minusOne() {
            model.update({
                number: this.book.number - (this.n-0)
            }).then(() => {
                console.log('minuseOne:')
                console.log(this)
                console.log(this.view)
                console.log(this.book)
                console.log(model.data)
                // this.book = model.data
            })
        },
        reset() {
            model.update({
                number: 0
            }).then(() => {
                this.book = model.data
            })
        },
    }
})
