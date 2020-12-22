const mongoose = require('mongoose');
const Department = require('../model/Department');
const Tech_Stack = require('../model/Tech_Stack');
const Staff = require('../model/Staff');
const { logger } = require('../helper/Winston');
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess } = require('../helper/Config_Message');


const createDepartment = async (req, res) => {
    try {
        const record = await Department.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Department.findById(id);
        const tech_Stackrecord = await Tech_Stack.find(
            {
                _id: { $in: record.tech_stack }
            },
        );
        const staffrecord = await Staff.find(
            {
                _id: { $in: record.staff }
            },
        );
        res.json(getSuccess({ record, tech_Stackrecord, staffrecord }));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const editDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Department.findByIdAndUpdate(id, { ...req.body });
        res.json(putSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Department.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const searchDepartment = async (req, res) => {
    try {
        const q = req.query.name;
        const data = await Department.find({ name: { $regex: q, $options: '$i' } });
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

module.exports = {
    createDepartment,
    editDepartment,
    deleteDepartment,
    searchDepartment,
    getDepartment
};
