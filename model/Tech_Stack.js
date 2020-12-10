const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechStackSchema = new Schema({
    name: String,
    description: String,
    status: String
});

module.exports = mongoose.model('TechStack', TechStackSchema);