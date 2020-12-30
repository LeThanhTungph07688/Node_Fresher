const Project = require('../model/Project');
const express = require('express');
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
const Tech_Stack = require('../model/Tech_Stack');
const ProjectType = require('../model/ProjectType');
const Staff = require('../model/Staff');
const Department = require('../model/Department');
const populate = ({ path: 'techStackRecord', select: 'name' },
    { path: 'staffRecord', select: 'name' },
    { path: 'projectTypeRecord', select: 'name' },
    { path: 'departmentRecord', select: 'name' });
const { calculateLimitAndOffset, paginate } = require('paginate-info');

const getAll = async (payload) => {
    try {
        const currentPage = payload.currentPage;
        const pageSize = payload.pageSize;
        const count = await Project.estimatedDocumentCount();
        const { limit, offset } = calculateLimitAndOffset(currentPage, pageSize);
        console.log(currentPage);
        if (currentPage <= 0 || pageSize <= 0) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        if (currentPage > count / pageSize) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
        const data = await Project.find()
            .limit(limit)
            .skip(offset)
            .sort('name');
        const meta = paginate(currentPage, count, data, pageSize);
        return getSuccess(data, meta);
    } catch (error) {
        throw error;
    }
};

const searchPro = async (payload) => {
    try {
        const q = payload;
        const data = await findOne(Project, { status: { $regex: q, $options: '$i' } });
        if (!data) {
            return errorHandle(404, 'INVALID', 'Not Found');
        }
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
        const techStackRecord = await Tech_Stack.find(
            {
                _id: { $in: data.tech_stack }
            }, 'name', populate);
        const staffRecord = await Staff.find(
            {
                _id: { $in: data.staff }
            }, 'name', populate);
        const projectTypeRecord = await ProjectType.find(
            {
                _id: { $in: data.project_type }
            }, 'name', populate);
        const departmentRecord = await Department.find(
            {
                _id: { $in: data.department }
            }, 'name', populate);
        return getSuccess({
            data,
            staffRecord,
            techStackRecord,
            projectTypeRecord,
            departmentRecord
        });
    } catch (error) {
        throw error;
    }
};

const insertProject = async (payload) => {
    try {
        const data = await findList(Project);

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
    removeProject,
    searchPro
}
