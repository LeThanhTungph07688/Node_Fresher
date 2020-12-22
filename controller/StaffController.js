const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const errorhandler = require('errorhandler');
const Skill = require('../model/Skill');
const Project = require('../model/Project');
const { logger } = require('../helper/Winston');
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess } = require('../helper/Config_Message');

const createStaff = async (req, res) => {
    try {
        const record = await Staff.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const getStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Staff.findById(id);
        const projectrecord = await Project.find(
            { _id: { $in: record.project } },
        );
        const skillrecord = await Skill.find(
            { _id: { $in: record.skill } });
        res.json(getSuccess({ record, projectrecord, skillrecord }));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}
const editStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Staff.findByIdAndUpdate(id, { ...req.body });
        res.json(putSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Staff.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const searchStaff = async (req, res) => {
    try {
        const q = req.query.name;
        const data = await Staff.find({ name: { $regex: q, $options: '$i' } });
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}
module.exports = {
    createStaff,
    getStaff,
    editStaff,
    deleteStaff,
    searchStaff
};