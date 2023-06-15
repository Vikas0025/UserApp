const { randomUUID } = require('crypto')
const User = require('../models/user')

const users = [{id: 1, name: "Vikas", age: 22}]

exports.displayUsers = (req, res, next) => {
    User.fetchAll().then(([users]) => {
        res.render('users', {users, title: 'users', active:"users"})
    }).catch((err) => {
        console.log(err);
    })
}

exports.addUserForm = (req, res, next) => {
    res.render('createUser',{title: 'add', active:"", edit:false, user:{}})
}
exports.editUserForm = (req, res, next) => {
    User.fetchAll().then(([users]) => {
        const id = req.params.id
        const user = users.filter(u => u.id === id)[0]
        res.render('createUser', {title: 'edit', active:"", edit:true, user})
    })
    
}

exports.addUser = (req, res, next) => {
    const {name, age} = req.body;
    const user = new User(randomUUID(), name, age,);
    user.save().then((data) => {
        res.redirect('/users')
    }).catch(err => {
        console.log(err)
    })
    
}

exports.editUser = (req, res, next) => {
    const { name, age, id} = req.body
    const newUser = {name, age, id}
    User.updateUser(newUser).then(() => {
        res.redirect(`/users/${id}`)
    }).catch(err => {
        console.log(err)
    })
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.deleteById(id).then(() => {
        res.redirect('/users')
    }).catch(err => {
        console.log(err)
    })
};

exports.displayUser = (req, res, next) => {
    const id = req.params.id
    User.findById(id).then(([u]) => {
        res.render('user', {user: u[0], title: 'user', active:""})
    }).catch(err => {
        console.log(err);
    })
};
