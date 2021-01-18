const Staff = require('../model/Staff');
const Tech_Stack = require('../model/Tech_Stack');
const Skill = require('../model/Skill');
const Project = require('../model/Project');
const {
  getAll,
  insertStaff,
  getById,
  updateStaff,
  removeStaff
} = require('../service/Staff.service');

const createStaff = async (req, res, next) => {
  try {
    const data = await insertStaff(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getStaff = async (req, res, next) => {
  try {
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getStaffId = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editStaff = async (req, res, next) => {
  try {
    const data = await updateStaff(req.params.id, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteStaff = async (req, res, next) => {
  try {
    const data = await removeStaff(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const searchStaff = async (req, res, next) => {
  try {
    const q = req.query.name;
    const data = await Staff.find({ name: { $regex: q, $options: '$i' } });
    res.json(searchSuccess(data));
  } catch (error) {
    res.json(error.message);
    logger.error(error.message);
  }
};
module.exports = {
  createStaff,
  getStaff,
  getStaffId,
  editStaff,
  deleteStaff,
  searchStaff
};