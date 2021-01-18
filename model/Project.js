const mongoose = require('mongoose');
const Department = require('./Department');
const ProjectType = require('./ProjectType');
const Staff = require('./Staff');
const TechStack = require('./Tech_Stack');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  name: String,
  tech_stacks: [{ type: Schema.Types.ObjectId, ref: TechStack }],
  projectType: [{ type: Schema.Types.ObjectId, ref: ProjectType }],
  staff: [{ type: Schema.Types.ObjectId, ref: Staff }],
  department: [{ type: Schema.Types.ObjectId, ref: Department }],
  status: String,
},
  {
    timestamps: true
  });

module.exports = mongoose.model('Project', ProjectSchema);
