const CustomerRouter = require('express').Router();
const CustomerController = require('../controllers/customer.controller');
const { authorizedUser } = require('../middlewares/authMiddleware');

CustomerRouter.post("/customerlist", authorizedUser, CustomerController.getCustomerList);
CustomerRouter.post("/findCustomer", authorizedUser, CustomerController.findCustomer);

module.exports = CustomerRouter;