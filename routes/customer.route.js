const CustomerRouter = require('express').Router();
const CustomerController = require('../controllers/customer.controller');

CustomerRouter.get("/customerlist", CustomerController.getCustomerList);

module.exports = CustomerRouter;