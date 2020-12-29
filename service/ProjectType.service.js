const ProjectType = require('../model/ProjectType');
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

const getAll = async () => {
    try {
        const data = await findList(ProjectType);
        return getSuccess(data);
    } catch (error) {
        throw error;
    }
};

const getById = async (id) => {
    try {
        const data = await findOne(ProjectType, { _id: id });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        return getSuccess(data);
    } catch (error) {
        throw error;
    }
};

const insertProjectType = async (payload) => {
    try {
        const data = await findOne(ProjectType, { name: payload.name });
        if (data) {
            return errorHandle(400, 'INVALID', 'Name is already');
        }
        const record = await insert(ProjectType, payload);
        return postSuccess(record);
    } catch (error) {
        throw error;
    }
};

const updateProjectType = async (id, payload) => {
    try {
        const dataTech = await findOne(ProjectType, { name: payload.name });
        console.log(dataTech);
        const data = await findOne(ProjectType, { _id: id }, { payload });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        if (dataTech) {
            return errorHandle(400, 'INVALID', 'Name Is Already');
        }
        const record = await update(ProjectType, id, payload);
        return putSuccess(record);
    } catch (error) {
        throw error;
    }
};

const removeProjectType = async (id) => {
    try {
        const data = await findOne(ProjectType, { _id: id });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        const record = await deleteOne(ProjectType, id);
        return deleteSuccess(record);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAll,
    insertProjectType,
    getById,
    updateProjectType,
    removeProjectType
}

