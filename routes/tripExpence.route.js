const TripExpenceRouter = require('express').Router();
const TripExpenceController = require('../controllers/tripExpence.controller')
const { authorizedUser } = require('../middlewares/authMiddleware');

TripExpenceRouter.post('/tripExpenceList', TripExpenceController.getTripExpenceList);

module.exports = TripExpenceRouter;