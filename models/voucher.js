var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VoucherSchema = new Schema({
    title: String,
    type: String,
    value: Number,
    status: String,
    expire: String,
    describe: String,
});
module.exports = Group = mongoose.model('Voucher', VoucherSchema);