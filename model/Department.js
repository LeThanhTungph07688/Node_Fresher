const mongoose = require('mongoose');
const Staff = require('./Staff');
const Tech_Stack = require('./Tech_Stack');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    mission: String,
    tech_stack: [{ type: Schema.Types.ObjectId, ref: Tech_Stack }],
    staff: [{ type: Schema.Types.ObjectId, ref: Staff }],
});

module.exports = mongoose.model('Department', DepartmentSchema);