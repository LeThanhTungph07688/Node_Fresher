const Project = require('../model/Project');
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
const ProjectType = require('../model/ProjectType');
const Staff = require('../model/Staff');
const Department = require('../model/Department');

const getAll = async () => {
    try {
        const data = await findList(Project);
        return getSuccess(data);
    } catch (error) {
        throw error;
    }
};

const getById = async (id) => {
    try {
        const data = await findOne(Project, { _id: id });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        const tech_stackRecord = await Tech_Stack.find(
            {
                _id: { $in: data.tech_stack }
            }, 'name'
        ).populate({ path: 'tech_stackRecord', select: 'name' });
        const staffRecord = await Staff.find(
            {
                _id: { $in: data.staff }
            }, 'name'
        ).populate({ path: 'staffRecord', select: 'name' });
        const projectTypeRecord = await ProjectType.find(
            {
                _id: { $in: data.project_type }
            }, 'name'
        ).populate({ path: 'projectTypeRecord', select: 'name' });
        const departmentRecord = await Department.find(
            {
                _id: { $in: data.department }
            }, 'name'
        ).populate({ path: 'departmentRecord', select: 'name' });
        return getSuccess({
            data,
            tech_stackRecord,
            projectTypeRecord,
            departmentRecord
        });
    } catch (error) {
        throw error;
    }
};

const insertProject = async (payload) => {
    try {
        const record = await insert(Project, payload);
        return postSuccess(record);
    } catch (error) {
        throw error;
    }
};

const updateProject = async (id, payload) => {
    try {
        const data = await findOne(Project, { _id: id }, { payload });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        const record = await update(Project, id, payload);
        return putSuccess(record);
    } catch (error) {
        throw error;
    }
};

const removeProject = async (id) => {
    try {
        const data = await findOne(Project, { _id: id });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        const record = await deleteOne(Project, id);
        return deleteSuccess(record);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAll,
    insertProject,
    getById,
    updateProject,
    removeProject
}
