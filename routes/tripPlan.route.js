const TripRouter = require('express').Router();
const TripController = require('../controllers/tripPlan.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

TripRouter.get('/', authorizedUser, TripController.tripPlan); // just check data

module.exports = TripRouter;