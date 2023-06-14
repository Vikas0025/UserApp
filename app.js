const path = require('path')
const { randomUUID } = require('crypto')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

let users = []

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res, next) => {
    res.render('home', {title: 'home', active:"home"})
})

app.get('/users', (req, res, next) => {
    res.render('users', {users, title: 'users', active:"users"})
})


app.get('/users/add', (req, res, next) => {
    res.render('createUser',{title: 'add', active:""})
})

app.post('/users/add', (req, res, next) => {
    const {name, age} = req.body;
    const user = {name, age, id: randomUUID()}
    users.push(user)
    res.redirect('/users')
})

app.get('/user/:id', (req, res, next) => {
    const id = req.params.id
    for(let u of users) {
        if(u.id === id){
            res.render('user', {user: u, title: 'user', active:""})
        }
    }
})
app.delete('/user/:id', (req, res, next) => {
    const id = req.params.id;
    for(let i=0;i<users.length;i++) {
        let u = users[i];
        if(u.id === id){
            users.splice(i,1);
            break;
        }
    }
    res.json({
        success:true
    })
})

app.use('/', (req, res, next) => {
    res.render('404', {title: '404', active:""})
} )


app.listen(3000, () => {
    console.log("Running...")
})