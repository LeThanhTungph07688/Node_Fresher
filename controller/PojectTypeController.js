const ProjectType = require('../model/ProjectType');
const mongoose = require('mongoose');
const { logger } = require('../helper/Winston');
const {
    getAll,
    insertProjectType,
    getById,
    updateProjectType,
    removeProjectType
} = require('../service/ProjectType.service');


const createProjectType = async (req, res) => {
    try {
        const data = await insertProjectType(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const listProjectType = async (req, res) => {
    try {
        const data = await getAll();
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const editProjectType = async (req, res) => {
    try {
        const data = await updateProjectType(req.params.id, req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const deleteProjectType = async (req, res) => {
    try {
        const data = await removeProjectType(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const getProjectTypeId = async (req, res, next) => {
    try {
        const data = await getById(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const searchProjectType = async (req, res) => {
    try {
        const q = req.query.name;
        const data = await ProjectType.find({ name: { $regex: q, $options: '$i' } });
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}
module.exports = {
    createProjectType,
    editProjectType,
    deleteProjectType,
    searchProjectType,
    listProjectType,
    getProjectTypeId
};
