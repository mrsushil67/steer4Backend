const { VehicleStatus, CustomerStatus } = require('../controllers/dashboard.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

const DashboardRouter = require('express').Router();

DashboardRouter.get('/totalData',authorizedUser, CustomerStatus);

module.exports = DashboardRouter;