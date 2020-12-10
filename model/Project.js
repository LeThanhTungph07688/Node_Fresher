const mongoose = require('mongoose');
const Department = require('./Department');
const ProjectType = require('./ProjectType');
const Staff = require('./Staff');
const Tech_Stack = require('./Tech_Stack');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({

    tech_stack: [{ type: Schema.Types.ObjectId, ref: Tech_Stack }],
    project_type: { type: Schema.Types.ObjectId, ref: ProjectType },
    staff: [{ type: Schema.Types.ObjectId, ref: Staff }],
    department: { type: Schema.Types.ObjectId, ref: Department },
    status: String
},
    {
        timestamps: true
    });


module.exports = mongoose.model('Project', ProjectSchema);