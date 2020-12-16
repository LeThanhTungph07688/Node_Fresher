const mongoose = require('mongoose');
const Project = require('./Project');
const Skill = require('./Skill');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: String,
    birthday: Date,
    phoneNumber: Number,
    adress: String,
    skill: [{ type: Schema.Types.ObjectId, ref: Skill }],
    project: { type: Schema.Types.ObjectId, ref: Project },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Staff', StaffSchema);