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
};

const getDepartment = async (req, res, next) => {
  try {
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getDepartmentId = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editDepartment = async (req, res, next) => {
  try {
    const data = await updateDepartment(req.params.id, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteDepartment = async (req, res, next) => {
  try {
    const data = await removeDepartment(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createDepartment,
  editDepartment,
  deleteDepartment,
  getDepartment,
  getDepartmentId
};
