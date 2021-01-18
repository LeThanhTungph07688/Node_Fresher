const Staff = require('../model/Staff');
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
const Skill = require('../model/Skill');
const TechStack = require('../model/Tech_Stack');
const populate = (
  { path: 'skillData', select: 'experience' },
  { path: 'tech_stackData', select: 'name' }
);

const getAll = async (payload) => {
  try {
    const q = payload.name;
    const data = await Staff.find({ name: { $regex: q, $options: '$i' } });
    return getSuccess(data);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const data = await findOne(Staff, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const skillData = await Skill.find(
      {
        _id: { $in: data.skill }
      }, 'experience', populate);
    const skillDataTeck = await findOne(Skill,
      {
        _id: { $in: data.skill }
      });
    const techStackData = await TechStack.find(
      {
        _id: { $in: skillDataTeck.tech_stack }
      }, 'name', populate
    );
    return getSuccess({ data, skillData, techStackData });
  } catch (error) {
    throw error;
  }
};

const insertStaff = async (payload) => {
  try {
    const data = await findOne(Staff, { name: payload.name });
    if (data) {
      return errorHandle(400, 'INVALID', 'Name is already');
    }
    const record = await insert(Staff, payload);
    return postSuccess(record);
  } catch (error) {
    throw error;
  }
};

const updateStaff = async (id, payload) => {
  try {
    const data = await findOne(Staff, { _id: id }, { payload });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const dataU = await findOne(Staff, { name: payload.name });
    if (dataU) {
      return errorHandle(400, 'INVALID', 'Name is already');
    }
    const record = await update(Staff, id, payload);
    return putSuccess(record);
  } catch (error) {
    throw error;
  }
};

const removeStaff = async (id) => {
  try {
    const data = await findOne(Staff, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const record = await deleteOne(Staff, id);
    return deleteSuccess(record);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  insertStaff,
  getById,
  updateStaff,
  removeStaff
};
