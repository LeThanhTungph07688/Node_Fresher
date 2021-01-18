const mongoose = require('mongoose');
const TechStack = require('./Tech_Stack');
const Staff = require('./Staff');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  experience: String,
  staff: [{ type: Schema.Types.ObjectId, ref: Staff }],
  tech_stack: [{ type: Schema.Types.ObjectId, ref: TechStack }],
});

module.exports = mongoose.model('Skill', SkillSchema);
