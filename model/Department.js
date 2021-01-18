const mongoose = require('mongoose');
const Staff = require('./Staff');
const TechStack = require('./Tech_Stack');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: String,
  description: String,
  mission: String,
  techstack: [{ type: Schema.Types.ObjectId, ref: TechStack }],
  staff: [{ type: Schema.Types.ObjectId, ref: Staff }],
});

module.exports = mongoose.model('Department', DepartmentSchema);
