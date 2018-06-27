var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OwnershipSchema = new Schema({
    user_id: String,
    voucher_id: String,
    company: String,
    type: String,
    value: Number,
});
module.exports = Group = mongoose.model('Ownership', OwnershipSchema);