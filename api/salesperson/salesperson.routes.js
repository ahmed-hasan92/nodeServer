const express = require('express');
const { salespersonDataByPeriod } = require('./salesperson.controller');

const router = express.Router();
router.get('/salesperson/:period', salespersonDataByPeriod);

module.exports = router;
