const VehicleRouter = require("express").Router();
const VehicleController = require('../controllers/vehicle.controller')

VehicleRouter.get('/total',VehicleController.getVehicleList)

module.exports = VehicleRouter;