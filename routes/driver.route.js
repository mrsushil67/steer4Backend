const express = require('express');
const DriverRouter = express.Router();
const { authorizedUser } = require('../middlewares/authMiddleware') //middleware for check user authentication

const DriverController = require('../controllers/driver.controller');

DriverRouter.post('/driverlist', authorizedUser ,DriverController.getDriversList);
DriverRouter.get('/:Id', DriverController.getDriverLisence);


module.exports = DriverRouter;