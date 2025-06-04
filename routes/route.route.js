const RouteRouter = require('express').Router();
const RouteController = require('../controllers/route.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

RouteRouter.post('/routelist', authorizedUser, RouteController.getRoutelist);

module.exports = RouteRouter;