const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const { searchSuccess } = require('../helper/Config_Message');
const { updateProject, insertProject, removeProject, getById } = require('../service/Project.service');


const createProject = async (req, res, next) => {
    try {
        const data = await insertProject(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const getProjectId = async (req, res, next) => {
    try {
        const data = await getById(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const editProject = async (req, res, next) => {
    try {
        const data = await updateProject(req.params.id, req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const deleteProject = async (req, res, next) => {
    try {
        const data = await removeProject(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const searchProject = async (req, res, next) => {
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
    getProjectId,
    editProject,
    deleteProject,
    searchProject
};