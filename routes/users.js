const router = require('express').Router()
const usersController = require('../controllers/users')



router.get('/', usersController.displayUsers)


router.get('/add', usersController.addUserForm)

router.get('/edit/:id', usersController.editUserForm)

router.post('/add', usersController.addUser)

router.post('/edit', usersController.editUser)

router.post('/delete/:id', usersController.deleteUser)

router.get('/:id', usersController.displayUser)

module.exports = router;