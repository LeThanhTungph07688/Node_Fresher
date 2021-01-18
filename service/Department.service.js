const Department = require('../model/Department');
const { findOne,
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
const TechStack = require('../model/Tech_Stack');
const Staff = require('../model/Staff');
const populate = (
  { path: 'techStackRecord', select: 'name' },
  { path: 'staffRecord', select: 'name' },
  { path: 'staffRecord', select: 'name' });

const getAll = async (payload) => {
  try {
    const q = payload.name;
    const data = await Department.find({ name: { $regex: q, $options: '$i' } });
    return getSuccess(data);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const data = await findOne(Department, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const techStackRecord = await TechStack.find(
      {
        _id: { $in: data.tech_stack }
      }, 'name', populate
    );
    const staffRecord = await Staff.find(
      {
        _id: { $in: data.staff }
      }, 'name', populate
    );
    return getSuccess({
      data,
      techStackRecord,
      staffRecord
    });
  } catch (error) {
    throw error;
  }
};

const insertDepartment = async (payload) => {
  try {
    const data = await findOne(Department, { name: payload.name });
    if (data) {
      return errorHandle(400, 'INVALID', 'Name is already');
    }
    const record = await insert(Department, payload);
    return postSuccess(record);
  } catch (error) {
    throw error;
  }
};

const updateDepartment = async (id, payload) => {
  try {
    const data = await findOne(Department, { _id: id }, { payload });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const record = await update(Department, id, payload);
    return putSuccess(record);
  } catch (error) {
    throw error;
  }
};

const removeDepartment = async (id) => {
  try {
    const data = await findOne(Department, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const record = await deleteOne(Department, id);
    return deleteSuccess(record);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  insertDepartment,
  getById,
  updateDepartment,
  removeDepartment
};
