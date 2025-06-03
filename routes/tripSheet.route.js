const TripSheetRouter = require('express').Router();
const TripSheetController = require('../controllers/tripSheet.controller');

TripSheetRouter.get('/',TripSheetController.getTripSheetNumber);

module.exports = TripSheetRouter;