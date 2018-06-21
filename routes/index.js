var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('test/index', { title: 'Express' });
});

/* GET Buy voucher page. */
router.get('/buyVouchers/allCoupons', function(req, res) {
  res.render('buy-voucher/all_coupon.jade', { title: 'Express' });
});

router.get('/buyVouchers/detail', function(req, res) {
  res.render('buy-voucher/detail.jade', { title: 'Express' });
});

router.get('/buyVouchers/payment', function(req, res) {
  res.render('buy-voucher/payment.jade', { title: 'Express' });
});

router.get('/buyVouchers/buyVC', function(req, res) {
  res.render('buy-voucher/buy_vc.jade', { title: 'Express' });
});

/* GET Use voucher page. */
router.get('/useVouchers/allCoupons', function(req, res) {
  res.render('use-voucher/all_coupon.jade', { title: 'Express' });
});

router.get('/useVouchers/useVC', function(req, res) {
  res.render('use-voucher/use_vc.jade', { title: 'Express' });
});

router.get('/useVouchers/qrCodeCoupon', function(req, res) {
  res.render('use-voucher/qr_code_coupon.jade', { title: 'Express' });
});
module.exports = router;
