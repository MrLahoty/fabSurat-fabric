// controllers/couponController.js

exports.validateCoupon = async (req, res, next) => {
    const { code } = req.body;
    
    // Simulate coupon validation
    const validCoupons = {
      'DISCOUNT10': 10,
      'FABSURAT200': 200,
      'DISCOUNT20': 20
    };
  
    if (validCoupons[code]) {
      res.status(200).json({
        success: true,
        discount: validCoupons[code],
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid coupon code',
      });
    }
  };
  