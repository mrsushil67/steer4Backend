const CustomerRouter = require('express').Router();
const CustomerController = require('../controllers/customer.controller');

CustomerRouter.post("/customerlist", CustomerController.getCustomerList);

module.exports = CustomerRouter;