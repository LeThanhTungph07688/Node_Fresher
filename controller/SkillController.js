const Staff = require('../model/Staff');
const Tech_Stack = require('../model/Tech_Stack');
const Skill = require('../model/Skill');
const {
  getAll,
  insertSkill,
  getById,
  updateSkill,
  removeSkill
} = require('../service/Skill.service');

const createSkill = async (req, res, next) => {
  try {
    const data = await insertSkill(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getSkill = async (req, res, next) => {
  try {
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getSkillId = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editSkill = async (req, res, next) => {
  try {
    const data = await updateSkill(req.params.id, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  try {
    const data = await removeSkill(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createSkill,
  getSkill,
  getSkillId,
  editSkill,
  deleteSkill,
};
