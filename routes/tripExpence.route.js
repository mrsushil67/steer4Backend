const TripExpenceRouter = require('express').Router();
const TripExpenceController = require('../controllers/tripExpence.controller')
const { authorizedUser } = require('../middlewares/authMiddleware');

TripExpenceRouter.post('/tripExpenceList',authorizedUser, TripExpenceController.getTripExpenceList);
TripExpenceRouter.get('/expenceCategory', TripExpenceController.getExpenceCategoryList);
TripExpenceRouter.get('/paymentMode', TripExpenceController.getPaymentMode);
TripExpenceRouter.get('/getPumps', TripExpenceController.getPumpVendor);
TripExpenceRouter.post('/addTripExpence',authorizedUser, TripExpenceController.createTripAdvanceExpence)
TripExpenceRouter.post('/getExpences',authorizedUser, TripExpenceController.getTripAdvanceOnRouteExpence);

module.exports = TripExpenceRouter;