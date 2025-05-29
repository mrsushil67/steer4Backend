const MainRouter = require('express').Router();
const UserRouter = require('../routes/user.route')
const DriverRouter = require('../routes/driver.route')

MainRouter.use('/user',UserRouter);
MainRouter.use('/driver',DriverRouter);

module.exports = MainRouter;