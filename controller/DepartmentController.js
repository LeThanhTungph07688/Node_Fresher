const Department = require('../model/Department');
const Tech_Stack = require('../model/Tech_Stack');
const Staff = require('../model/Staff');
const {
    getAll,
    insertDepartment,
    getById,
    updateDepartment,
    removeDepartment
} = require('../service/Department.service');

const createDepartment = async (req, res, next) => {
    try {
        const data = await insertDepartment(req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const getDepartment = async (req, res, next) => {
    try {
        const data = await getAll();
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const getSkillId = async (req, res, next) => {
    try {
        const data = await getById(req.params.id);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const editDepartment = async (req, res, next) => {
    try {
        const data = await updateDepartment(req.params.id, req.body);
        res.status(data.status).json(data);
    } catch (error) {
        return next(error);
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Department.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const searchDepartment = async (req, res, next) => {
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
    getDepartment,
    getSkillId
};
