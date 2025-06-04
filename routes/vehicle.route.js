const VehicleRouter = require("express").Router();
const VehicleController = require('../controllers/vehicle.controller');
const { authorizedUser } = require("../middlewares/authMiddleware");

VehicleRouter.get('/vehiclelist', authorizedUser, VehicleController.getVehicleList)
VehicleRouter.get('/size', VehicleController.getVehicleSize);

module.exports = VehicleRouter;