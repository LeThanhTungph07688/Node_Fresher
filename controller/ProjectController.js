const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const ProjectType = require('../model/ProjectType');
const Department = require('../model/Department');
const Project = require('../model/Project');


const createProject = async (req, res) => {
    console.log(req.body);
    const record = await Project.create({ ...req.body });
    res.json({ record });
}

const getProject = async (req, res) => {
    const { id } = req.params;
    const record = await Project.findById(id);
    const tech_Stackrecord = await Tech_Stack.find(
        {
            _id: { $in: record.tech_stack }
        },
    );
    const projectTyperecord = await ProjectType.find(
        {
            _id: { $in: record.project_type }
        },
    );
    const staffrecord = await Staff.find(
        {
            _id: { $in: record.staff }
        },
    );
    const departmentrecord = await Department.find(
        {
            _id: { $in: record.department }
        },
    );
    res.json({ record, tech_Stackrecord, projectTyperecord, staffrecord, departmentrecord });
}

const editProject = async (req, res) => {
    const { id } = req.params;
    await Project.findByIdAndUpdate(id, { ...req.body });
    return res.json({ message: 'Updated Staff successfully!' })
}

const deleteProject = async (req, res) => {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    return res.json({ message: 'delete successfully!' })
}

// const searchProject = async (req, res) => {
//     const q = req.query.info;
//     console.log(q);
//     Staff.find({ info: { $regex: q, $options: '$i' } })
//         .then(data => {
//             res.json(data)
//         })
// }

module.exports = { createProject, getProject, editProject, deleteProject };