const Skill = require('../model/Skill');
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

const getAll = async (payload) => {
  try {
    const q = payload.experience;
    const data = await Skill.find({ experience: { $regex: q, $options: '$i' } });
    return getSuccess(data);
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const data = await findOne(Skill, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const techStackRecord = await TechStack.find(
      {
        _id: { $in: data.tech_stack }
      }, 'name'
    ).populate({ path: 'techStackRecord', select: 'name' });
    if (!techStackRecord) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    return getSuccess({ data, techStackRecord });
  } catch (error) {
    throw error;
  }
};

const insertSkill = async (payload) => {
  try {
    const record = await insert(Skill, payload);
    return postSuccess(record);
  } catch (error) {
    throw error;
  }
};

const updateSkill = async (id, payload) => {
  try {
    const data = await findOne(Skill, { _id: id }, { payload });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const record = await update(Skill, id, payload);
    return putSuccess(record);
  } catch (error) {
    throw error;
  }
};

const removeSkill = async (id) => {
  try {
    const data = await findOne(Skill, { _id: id });
    if (!data) {
      return errorHandle(404, 'INVALID', 'Not Found');
    }
    const record = await deleteOne(Skill, id);
    return deleteSuccess(record);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  insertSkill,
  getById,
  updateSkill,
  removeSkill
};

