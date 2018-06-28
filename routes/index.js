var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');
var Ticket = require('../models/ticket');
var Voucher = require('../models/voucher');
var Ownership = require('../models/ownership');

// ----------------//
/* Customer Detail */
// ----------------//
router.post('/addCustomer', function (req, res) {
  var query = { username: req.body.username,
                password: req.body.password};
  Customer.find(query, function (err, customers) {
    if (err) throw err;
    else if (customers.length == 0) {
      var customer_model = new Customer(query);
      customer_model.save(function (err, customer) {
        if (err) throw err;
        else return res.send({"user_id": customer._id});
      });
    }
    else {
      return res.send({"user_id": customers[0]._id});
    }
  });
});

router.get('/getAllCustomer', function (req, res) {
  Customer.find({}, function (err, customers) {
    if (err) {
      throw err;
    }else {
      // delete customers[0].password;
      return res.send(customers);
    }
  });
});

// --------------//
/* Voucher Detail */
// --------------//
router.post('/generateVoucher', function (req, res) {
  var query = { title: req.body.title,
                type: req.body.type,
                value: req.body.value,
                status: req.body.status,
                expire: req.body.expire,
                describe: req.body.describe};
  Voucher.find(query, function (err, vouchers) {
    if (err) throw err;
    else if (vouchers.length == 0) {
      var voucher_model = new Voucher(query);
      voucher_model.save(function (err, voucher) {
        if (err) throw err;
        else return res.send({"voucher_id": voucher._id});
      });
    }
    else return res.send({"voucher_id": vouchers[0]._id});
  });
});

router.get('/getAllVoucher', function (req, res) {
  Voucher.find({}, function (err, vouchers) {
    if (err)  throw err;
    else {
      // delete customers[0].password;
      return res.send(vouchers);
    }
  });
});

// --------------//
/* Ticket Detail */
// --------------//
router.post('/generateTicket', function (req, res) {
  var query = { title: req.body.title,
                type: req.body.type,
                value: req.body.value,
                status: req.body.status,
                expire: req.body.expire,
                describe: req.body.describe};
  Ticket.find(query, function (err, tickets) {
    if (err) throw err;
    else if (tickets.length == 0) {
      var ticket_model = new Ticket(query);
      ticket_model.save(function (err, ticket) {
        if (err) throw err;
        else return res.send({"ticket_id": ticket._id});
      });
    }
    else return res.send({"ticket_id": tickets[0]._id});
  });
});

router.get('/getAllTicket', function (req, res) {
  Ticket.find({}, function (err, tickets) {
    if (err)  throw err;
    else {
      // delete customers[0].password;
      return res.send(tickets);
    }
  });
});

// -----------------//
/* Ownership Detail */
// -----------------//
router.post('/addVoucher', function (req, res) {
  var query = { user_id: req.body.user_id,
                voucher_id: req.body.voucher_id};
  Ownership.find(query, function (err, ownerships) {
    if (err) throw err;
    else if (ownerships.length == 0) {
      var ownership_model = new Ownership(query);
      ownership_model.save(function (err, ownership) {
        if (err) throw err;
        else return res.send("Add SUCCESS");
      });
    }
    else {
      return res.send("Already got it");
    }
  });
});

router.post('/useVoucher', function (req, res) {
  var query = { user_id: req.body.user_id,
                voucher_id: req.body.voucher_id};
  Ownership.deleteOne(query, function (err, ownerships) {
    if (err) throw err;
    else return res.send("Remove Voucher Success !!!");
  });
});

router.post('/changeVoucherOwner', function (req, res) {
  // var query = { user_id: req.body.send_user_id,
  //               voucher_id: req.body.voucher_id};
  // var promises = Ownership.deleteOne(query, function (err, ownerships) {
  //   if (err) throw err;
  //   else console.log("Remove Success!!!");
  // });
  // promises.then( () => {
  //   console.log("OK");
  //   var query2 = { user_id: req.body.receive_user_id,
  //                 voucher_id: req.body.voucher_id};
  //   Ownership.save(query2, function (err, ownership) {
  //   if (err) throw err;
  //   else if (ownership.length == 0) {
  //     console.log("OK1");
  //     var ownership_model = new Ownership(query2);
  //     ownership_model.save(function (err, ownership) {
  //       if (err) throw err;
  //       else return res.send("Change Success!!!");
  //     });
  //   }
  //   else return res.send("Change Fail!!!");
  //   });
  // }).catch((err) => {
  //   res.send('FAIL');
  // });
  var query = { voucher_id: req.body.voucher_id};
  var promises = Ownership.findOne(query, function (err, ownerships) {
    if (err) throw err;
    else{
      console.log("FOUND FORMER OWNER")
      return ownerships
    }
  });
  promises.then( (ownerships) => {
    return new Promise((resolve, reject) => {
      var query2 = { user_id: ownerships.user_id};
      Ownership.deleteOne( query2, function(err, result) {
        if(err) {
          console.log("NOT DELETED");
          throw err;
        }
        else{
          console.log("DELETED");
          resolve();
        }
      });
    })

  }).then( () => {
    return new Promise((resolve, reject) => {
      var query3 = { _id: req.body.voucher_id};
      Voucher.findOne(query3, function(err, voucher) {
        if(err) {
          console.log("VOUCHER NOTFOUND");
          throw err;
        }
        else{
          console.log("VOUCHER FOUND");
          resolve( voucher );
        }
      });
    })
  }).then( (voucher) => {
    var query4 = {user_id: req.body.send_user_id,
                  voucher_id: voucher._id,
                  company: voucher.company,
                  type: voucher.type,
                  value: voucher.value};
    var ownership_model = new Ownership(query4);
    ownership_model.save(function (err, ownership) {
      if(err) throw err;
      else res.send("CHANGED SUCCESSFULLY");
    });
  });
});

// router.get('/getAllCoupon', function (req, res) {
//   console.log("OK");
//   Group.find({}, function (err, groups) {
//     if (err) {
//       throw err;
//     }else {
//       return res.send(groups);
//     }
//   });
// });

// router.post('/createGroup', function (req, res) {
//   console.log("OK2");
//   var query = { name: req.body.gname };
//   Group.find(query, function (err, groups) {
//     if (err) console.error("group finding error");
//     else if (groups.length == 0) {
//       var group_model = new Group(query);
//       group_model.save(function (err, group) {
//         if (err) throw err;
//       });
//     }
//     else {
//       return res.send({ "gid": groups[0].id });
//     }
//   })
// });

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
