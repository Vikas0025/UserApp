const User = require('../models/user')

exports.displayUsers = (req, res, next) => {
    User.find().then((users) => {
        console.log(users);

        res.render('users', {users, title: 'users', active:"users"})
    }).catch((err) => {
        console.log(err);
    })
}

exports.addUserForm = (req, res, next) => {
    res.render('createUser',{title: 'add', active:"", edit:false, user:{}})
}

exports.editUserForm = (req, res, next) => {
    const id = req.params.id
    User.findById(id).then((user) => {
        res.render('createUser', {title: 'edit', active:"", edit:true, user})
    })
    
}

exports.addUser = (req, res, next) => {
    const {name, age} = req.body;
    const user = new User({name: name, age: parseInt(age)});
    user.save().then((data) => {
        res.redirect('/users')
    }).catch(err => {
        console.log(err)
    })
    
}

exports.editUser = (req, res, next) => {

    const { name, age, id} = req.body
    User.findById(id).then((user) => {
        user.name = name,
        user.age = parseInt(age);
        return user.save()
    }).then(ack => {
        console.log(ack)
        res.redirect(`/users/${id}`)
    }).catch(err => {
        console.log(err)
    })
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    User.deleteOne({_id: id}).then((ack) => {
        console.log(ack)
        res.redirect('/users');
    }).catch(err => {
        console.log(err)
    })
};

exports.displayUser = (req, res, next) => {
    const id = req.params.id
    User.findById(id).then((user) => {
        res.render('user', {user: user, title: 'user', active:""})
    }).catch(err => {
        console.log(err);
    })
};
