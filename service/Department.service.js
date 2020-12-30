const Department = require('../model/Department');
const { findOne,
    findList,
    insert,
    update,
    deleteOne } = require('./QueryAll');
const {
    putSuccess,
    getSuccess,
    postSuccess,
    searchSuccess,
    deleteSuccess,
    errorHandle
} = require('../helper/Config_Message');
const Tech_Stack = require('../model/Tech_Stack');
const Staff = require('../model/Staff');

const getAll = async () => {
    try {
        const data = await findList(Department);
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
        const techStackRecord = await Tech_Stack.find(
            {
                _id: { $in: data.tech_stack }
            }, 'name'
        ).populate({ path: 'techStackRecord', select: 'name' });
        const staffRecord = await Staff.find(
            {
                _id: { $in: data.staff }
            }, 'name'
        ).populate({ path: 'staffRecord', select: 'name' });
        return getSuccess({ data, techStackRecord, staffRecord });
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
}