const { getAll,
  createTech,
  getById,
  updateTech,
  deleteTech } = require('../service/TechStack.service');

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
};

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
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getTechStackId = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTechStack,
  editTechStack,
  deleteTechStack,
  listTechStack,
  getTechStackId
};
