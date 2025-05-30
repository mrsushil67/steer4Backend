const VehicleRouter = require("express").Router();
const VehicleController = require('../controllers/vehicle.controller')

VehicleRouter.get('/vehiclelist',VehicleController.getVehicleList)

module.exports = VehicleRouter;