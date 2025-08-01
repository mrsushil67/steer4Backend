const { VehicleStatus, CustomerStatus, DriverActivity } = require('../controllers/dashboard.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

const DashboardRouter = require('express').Router();

DashboardRouter.get('/totalData',authorizedUser, CustomerStatus);
DashboardRouter.get('/activeDriver', DriverActivity);

module.exports = DashboardRouter;