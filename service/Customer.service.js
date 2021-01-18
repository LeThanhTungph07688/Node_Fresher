const Customer = require('../model/Customer');
const { findOne,
  findList,
  insert,
  update,
  deleteOne } = require('./QueryAll');
const {
  putSuccess,
  getSuccess,
  postSuccess,
  deleteSuccess,
  errorHandle
} = require('../helper/Config_Message');

const insertCustomer = async (payload) => {
  try {
    const data = await findOne(Customer, { name: payload.name });
    if (data) {
      return errorHandle(400, 'INVALID', 'Name is already');
    }
    const record = await insert(Customer, payload);
    return postSuccess(record);
  } catch (error) {
    throw error;
  }
};

const updateCustomer = async (id, payload) => {
  try {
    const dataTech = await findOne(Customer, { name: payload.name });
    const data = await findOne(Customer, { _id: id }, { payload });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    if (dataTech) {
      return errorHandle(400, 'INVALID', 'Name Is Already');
    }
    const record = await update(Customer, id, payload);
    return putSuccess(record);
  } catch (error) {
    throw error;
  }
};

const deleteCustomer = async (id) => {
  try {
    const data = await findOne(Customer, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const record = await deleteOne(Customer, id);
    return deleteSuccess(record);
  } catch (error) {
    throw error;
  }
};

const getAll = async (payload) => {
  try {
    const q = payload.name;
    const data = await Customer.find({ name: { $regex: q, $options: '$i' } });
    return getSuccess(data);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const data = await findOne(Customer, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    return getSuccess(data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertCustomer,
  updateCustomer,
  deleteCustomer,
  getAll,
  getById
};
