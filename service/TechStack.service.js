const TechStack = require('../model/Tech_Stack');
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

const getAll = async () => {
    try {
        const data = await findList(TechStack);
        return getSuccess(data);
    } catch (error) {
        throw error;
    }
};

const getById = async (id) => {
    try {
        const data = await findOne(TechStack, { _id: id });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        return getSuccess(data);
    } catch (error) {
        throw error;
    }
};

const createTech = async (payload) => {
    try {
        const data = await findOne(TechStack, { name: payload.name });
        if (data) {
            return errorHandle(400, 'INVALID', 'Name is already');
        }
        const record = await insert(TechStack, payload);
        return postSuccess(record);
    } catch (error) {
        throw error;
    }
};

const updateTech = async (id, payload) => {
    try {
        const dataTech = await findOne(TechStack, { name: payload.name });
        console.log(dataTech);
        const data = await findOne(TechStack, { _id: id }, { payload });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        if (dataTech) {
            return errorHandle(400, 'INVALID', 'Name Is Already');
        }
        const record = await update(TechStack, id, payload);
        return putSuccess(record);
    } catch (error) {
        throw error;
    }
};

const deleteTech = async (id) => {
    try {
        const data = await findOne(TechStack, { _id: id });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        const record = await deleteOne(TechStack, id);
        return deleteSuccess(record);
    } catch (error) {
        throw error;
    }
};

const searchTech = async (payload) => {
    try {
        const q = payload;
        const data = await findOne(TechStack, { name: { $regex: q, $options: '$i' } });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        return getSuccess(data);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAll,
    createTech,
    getById,
    updateTech,
    deleteTech,
    searchTech
}

