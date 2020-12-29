const TechStack = require('../model/Tech_Stack');
const { getAll,
    createTech,
    getById,
    updateTech,
    deleteTech,
    searchTech } = require('../service/TechStack.service');

const createTechStack = async (req, res, next) => {
    try {
        const data = await createTech(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
};

const editTechStack = async (req, res, next) => {
    try {
        const data = await updateTech(req.params.id, req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const deleteTechStack = async (req, res, next) => {
    try {
        const data = await deleteTech(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
};

const listTechStack = async (req, res, next) => {
    try {
        const data = await getAll();
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}
const getTechStackId = async (req, res, next) => {
    try {
        const data = await getById(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const searchTechStack = async (req, res, next) => {
    try {
        const data = await searchTech(req.query.name);
        res.status(data.status).json(data);
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {
    createTechStack,
    editTechStack,
    deleteTechStack,
    searchTechStack,
    listTechStack,
    getTechStackId
};
