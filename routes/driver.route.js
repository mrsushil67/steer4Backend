const express = require('express');
const router = express.Router();

const DriverController = require('../controllers/driver.controller');

router.get('/:Id', DriverController.getDriverLisence);

module.exports = router;