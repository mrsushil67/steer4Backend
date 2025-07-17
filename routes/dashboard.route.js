const { VehicleStatus, CustomerStatus } = require('../controllers/dashboard.controller');

const DashboardRouter = require('express').Router();

DashboardRouter.get('/vehicleActivity', VehicleStatus);
DashboardRouter.get('/totalData', CustomerStatus);

module.exports = DashboardRouter;