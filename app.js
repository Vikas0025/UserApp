const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('./routes/users.js')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res, next) => {
    res.render('home', {title: 'home', active:"home"})
})

app.use('/users', userRouter);

app.use('/', (req, res, next) => {
    res.render('404', {title: '404', active:""})
} )


app.listen(3000, () => {
    console.log("Running...")
})