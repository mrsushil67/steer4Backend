const TripExpenceRouter = require('express').Router();
const TripExpenceController = require('../controllers/tripExpence.controller')
const { authorizedUser } = require('../middlewares/authMiddleware');

TripExpenceRouter.post('/tripExpenceList',authorizedUser, TripExpenceController.getTripExpenceList);
TripExpenceRouter.get('/expenceCategory', TripExpenceController.getExpenceCategoryList);
TripExpenceRouter.get('/paymentMode', TripExpenceController.getPaymentMode)

module.exports = TripExpenceRouter;