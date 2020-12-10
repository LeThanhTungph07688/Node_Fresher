const mongoose = require('mongoose');
const Project = require('./Project');
const Tech_Stack = require('./Tech_Stack');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: String,
    birthday: Date,
    phoneNumber: Number,
    experience: String,
    adress: String,
    tech_stack: [{ type: Schema.Types.ObjectId, ref: Tech_Stack }],
    project: { type: Schema.Types.ObjectId, ref: Project },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Staff', StaffSchema);