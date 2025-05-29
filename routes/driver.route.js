const express = require('express');
const router = express.Router();
const  { authorizedUser } = require('../middlewares/authMiddleware') //middleware for check user authentication

const DriverController = require('../controllers/driver.controller');

router.get('/:Id', DriverController.getDriverLisence);

module.exports = router;