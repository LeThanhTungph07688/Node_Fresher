const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const ProjectType = require('../model/ProjectType');
const Department = require('../model/Department');
const Project = require('../model/Project');
const { logger } = require('../helper/Winston');
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess } = require('../helper/Config_Message');


const createProject = async (req, res) => {
    try {
        const record = await Project.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const record = await Project.findById(id);
        const tech_Stackrecord = await Tech_Stack.find(
            {
                _id: { $in: record.tech_stack }
            },
        );
        const projectTyperecord = await ProjectType.find(
            {
                _id: { $in: record.project_type }
            },
        );
        const staffrecord = await Staff.find(
            {
                _id: { $in: record.staff }
            },
        );
        const departmentrecord = await Department.find(
            {
                _id: { $in: record.department }
            },
        );
        res.json(getSuccess({ record, tech_Stackrecord, projectTyperecord, staffrecord, departmentrecord }));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const editProject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Project.findByIdAndUpdate(id, { ...req.body });
        return res.json(putSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Project.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const searchProject = async (req, res) => {
    try {
        const q = req.query.status;
        const data = await Project.find({ status: { $regex: q, $options: '$i' } });
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }

}

module.exports = {
    createProject,
    getProject,
    editProject,
    deleteProject,
    searchProject
};