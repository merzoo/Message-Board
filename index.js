const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// 模板引擎配置
app.set('view engine', 'ejs')
app.set('views', './templates')

// 请求体解析中间件配置
app.use(bodyParser())

// 留言内容
const messages = []

// 首页路由
app.get('/', (req, res) => {
    console.log(11)
    res.render('index', {messages})
})

// 留言页路由
app.route('/publish')
    .get((req, res) => {
        res.render('publish')
    })
    .post((req, res) => {
        if(!req.body.name || !req.body.content) {
            throw new Error('name and cotent is required!')
        }
        const now = (new Date()).toLocaleString()
        messages.push({
            name: req.body.name,
            content: req.body.content,
            time: now // message event
        })

        res.redirect('/')
    })


// 开启监听
app.listen(9000, () => {
    console.log('listen on 9000')
})