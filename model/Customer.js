const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    description: String,
    prioritylevel: String,
    status: String
});

module.exports = mongoose.model('Customer', CustomerSchema);