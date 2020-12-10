const ProjectType = require('../model/ProjectType');
const mongoose = require('mongoose');

const createProjectType = async (req, res) => {
    console.log(req.body);
    const record = await ProjectType.create({ ...req.body })
    res.json({ record })
}

const editProjectType = async (req, res) => {
    const { id } = req.params;
    await ProjectType.findByIdAndUpdate(id, { ...req.body });
    return res.json({ message: 'Updated ProjectType successfully!' })
}

const deleteProjectType = async (req, res) => {
    const { id } = req.params;
    await ProjectType.findByIdAndDelete(id);
    return res.json({ message: 'delete successfully!' })
}

const searchProjectType = async (req, res) => {
    const q = req.query.name;
    console.log(q);
    ProjectType.find({ name: { $regex: q, $options: '$i' } })
        .then(data => {
            res.json(data)
        })
}

module.exports = { createProjectType, editProjectType, deleteProjectType, searchProjectType };
