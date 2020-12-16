const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const Skill = require('../model/Skill');



const createSkill = async (req, res) => {
    try {
        const record = await Skill.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
    }
}

const getSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Skill.findById(id);
        const staffrecord = await Staff.find(
            {
                _id: { $in: record.staff }
            },
        );
        const skillrecord = await Tech_Stack
            .find(
                {
                    _id: { $in: record.tech_stack }
                },
                'name')
            .populate('_id', 'name').exec((err, techStack) => {
                if (err) return handleError(err);
                res.json(getSuccess({ record, skillrecord, techStack, staffrecord }));
            });
    } catch (error) {
        res.json(error.message);
    }
}

const editSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Skill.findByIdAndUpdate(id, { ...req.body });
        res.json(putSuccess(data));
    } catch (error) {
        res.json(error.message);
    }
}

const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Skill.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
    }
}

const searchSkill = async (req, res) => {
    try {
        const q = req.query.experience;
        console.log(q);
        const data = await Skill.find({ experience: { $regex: q, $options: '$i' } });
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {
    createSkill,
    getSkill,
    editSkill,
    deleteSkill,
    searchSkill
};