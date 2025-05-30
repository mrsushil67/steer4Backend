const RouteRouter = require('express').Router();
const RouteController = require('../controllers/route.controller');

RouteRouter.get('/routelist', RouteController.getRoutelist);

module.exports = RouteRouter;