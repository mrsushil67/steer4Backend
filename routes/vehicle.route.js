const VehicleRouter = require("express").Router();
const VehicleController = require('../controllers/vehicle.controller');
const { authorizedUser } = require("../middlewares/authMiddleware");

VehicleRouter.post('/vehiclelist', authorizedUser, VehicleController.getVehicleList)
VehicleRouter.get('/size', VehicleController.getVehicleSize);

module.exports = VehicleRouter;