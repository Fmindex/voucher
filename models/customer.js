var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    username: String,
    password: String,
});
module.exports = Group = mongoose.model('Customer', CustomerSchema);