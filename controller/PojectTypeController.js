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
};

const listProjectType = async (req, res, next) => {
  try {
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editProjectType = async (req, res) => {
  try {
    const data = await updateProjectType(req.params.id, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteProjectType = async (req, res) => {
  try {
    const data = await removeProjectType(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const getProjectTypeId = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProjectType,
  editProjectType,
  deleteProjectType,
  listProjectType,
  getProjectTypeId
};
