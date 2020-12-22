const TechStack = require('../model/Tech_Stack');
const mongoose = require('mongoose');
const { logger } = require('../helper/Winston');
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess } = require('../helper/Config_Message');


const createTechStack = async (req, res) => {
    try {
        console.log(req.body);
        const record = await TechStack.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const editTechStack = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await TechStack.findByIdAndUpdate(id, { ...req.body });
        res.json(putSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const deleteTechStack = async (req, res) => {
    try {
        const { id } = req.params;
        await TechStack.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const searchTechStack = async (req, res) => {
    try {
        const q = req.query.name;
        console.log(q);
        const data = await TechStack.find({ name: { $regex: q, $options: '$i' } })
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

module.exports = {
    createTechStack,
    editTechStack,
    deleteTechStack,
    searchTechStack
};
