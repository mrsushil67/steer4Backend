const RouteRouter = require('express').Router();
const RouteController = require('../controllers/route.controller');

RouteRouter.post('/routelist', RouteController.getRoutelist);

module.exports = RouteRouter;