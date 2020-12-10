const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectTypeSchema = new Schema({
    name: String,
    description: String,
    priority: String,
    status: String
});

module.exports = mongoose.model('ProjectType', ProjectTypeSchema);