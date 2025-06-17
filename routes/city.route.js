const CityRouter = require('express').Router();
const CityController = require('../controllers/city.controller');

CityRouter.post('/totalCity', CityController.getAllCity);

module.exports = CityRouter;