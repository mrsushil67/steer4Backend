const TripRouter = require('express').Router();
const TripController = require('../controllers/tripPlan.controller')

TripRouter.get('/', TripController.tripPlan);

module.exports = TripRouter;