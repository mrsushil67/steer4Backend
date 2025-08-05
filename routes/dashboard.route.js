const { VehicleStatus, CustomerStatus, DriverActivity, getTotalExpence, TotalSales } = require('../controllers/dashboard.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

const DashboardRouter = require('express').Router();

DashboardRouter.get('/totalData',authorizedUser, CustomerStatus);
DashboardRouter.get('/activeDriver', DriverActivity);
DashboardRouter.get('/totalExpence',getTotalExpence);
DashboardRouter.get('/totalSales', TotalSales);

module.exports = DashboardRouter;