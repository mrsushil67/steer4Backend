const TripRouter = require('express').Router();
const TripController = require('../controllers/tripPlan.controller')

TripRouter.get('/', TripController.tripPlan); // just check data

module.exports = TripRouter;