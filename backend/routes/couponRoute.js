const express = require('express');
const router = express.Router();
const { validateCoupon } = require('../controllers/couponController');

router.post('/apply', validateCoupon);

module.exports = router;
