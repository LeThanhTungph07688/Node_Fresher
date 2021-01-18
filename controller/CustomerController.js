const Customer = require('../model/Customer');
const { logger } = require('../helper/Winston');
const { insertCustomer,
  updateCustomer,
  deleteCustomer,
  getAll,
  getById } = require('../service/Customer.service');

const createCustomer = async (req, res, next) => {
  try {
    const data = await insertCustomer(req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const editCustomer = async (req, res, next) => {
  try {
    const data = await updateCustomer(req.params.id, req.body);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const removeCustomer = async (req, res, next) => {
  try {
    const data = await deleteCustomer(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const listCustomer = async (req, res, next) => {
  try {
    const data = await getAll(req.query);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const listOne = async (req, res, next) => {
  try {
    const data = await getById(req.params.id);
    res.status(data.status).json(data);
  } catch (error) {
    return next(error);
  }
};

const searchCustomer = async (req, res) => {
  try {
    const q = req.query.name;
    const data = await Customer.find({ name: { $regex: q, $options: '$i' } });
    res.json(searchSuccess(data));
  } catch (error) {
    res.json(error.message);
    logger.error(error.message);
  }
};

module.exports = {
  createCustomer,
  editCustomer,
  removeCustomer,
  listCustomer,
  listOne,
  searchCustomer
};
