const ProjectType = require('../model/ProjectType');
const mongoose = require('mongoose');
const { logger } = require('../helper/Winston');
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess,
    notFound } = require('../helper/Config_Message');


const createProjectType = async (req, res) => {
    try {
        const record = await ProjectType.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const listProjectType = async (req, res) => {
    try {
        const record = await ProjectType.find({});
        res.json(getSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const editProjectType = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ProjectType.findByIdAndUpdate(id, { ...req.body });
        return res.json(putSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const deleteProjectType = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await ProjectType.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
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
    listProjectType
};
