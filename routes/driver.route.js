const express = require('express');
const DriverRouter = express.Router();
const  { authorizedUser } = require('../middlewares/authMiddleware') //middleware for check user authentication

const DriverController = require('../controllers/driver.controller');

DriverRouter.get('/:Id', authorizedUser, DriverController.getDriverLisence);

module.exports = DriverRouter;