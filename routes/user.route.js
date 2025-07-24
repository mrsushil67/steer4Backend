const UserRouter = require('express').Router();
const UserController = require('../controllers/user.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

UserRouter.post('/login',UserController.signInUser);
UserRouter.get('/profile',authorizedUser, UserController.userProfile);

module.exports = UserRouter;