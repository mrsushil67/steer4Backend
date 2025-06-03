const TripSheetRouter = require('express').Router();
const TripSheetController = require('../controllers/tripSheet.controller');

TripSheetRouter.post('/',TripSheetController.getTripSheetNumber);

module.exports = TripSheetRouter;