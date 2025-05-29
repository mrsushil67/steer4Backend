const UserRouter = require('express').Router();
const UserController = require('../controllers/user.controller')

UserRouter.post('/login',UserController.signInUser)

module.exports = UserRouter;