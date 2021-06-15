const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// view engine
app.set('view engine', 'ejs')
// set views
app.set('views', './templates')
// body parse
app.use(bodyParser())

// database
const messages = []

// router
app.get('/', (req, res) => {
    res.render('index', {messages})
})

app.route('/publish')
    .get((req, res) => {
        res.render('publish')
    })
    .post((req, res) => {
        const { name, content } = req.body
        // data check
        if(!name || !content) {
            throw new Error('name and content are required!')
        }
        messages.push({
            name,
            content,
            time: (new Date()).toLocaleString()
        })

        res.redirect('/')
    })




// listen ports
app.listen(9000, () => {
    console.log('app listen on 9000!')
})