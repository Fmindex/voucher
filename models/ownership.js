var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OwnershipSchema = new Schema({
    user_id: String,
    coupon_id: String,
});
module.exports = Group = mongoose.model('Ownership', OwnershipSchema);