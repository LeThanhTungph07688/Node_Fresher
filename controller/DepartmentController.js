const mongoose = require('mongoose');
const Department = require('../model/Department');
const Tech_Stack = require('../model/Tech_Stack');
const Staff = require('../model/Staff');


const createDepartment = async (req, res) => {
    try {
        const record = await Department.create({ ...req.body });
        res.json({ record });
    } catch (error) {
        console.log(error.message);
        res.json(1)
    }
}

const getDepartment = async (req, res) => {
    const { id } = req.params;
    const record = await Department.findById(id);
    const tech_Stackrecord = await Tech_Stack.find(
        {
            _id: { $in: record.tech_stack }
        },
    );
    const staffrecord = await Staff.find(
        {
            _id: { $in: record.staff }
        },
    );
    res.json({ record, tech_Stackrecord, staffrecord });
}

const editDepartment = async (req, res) => {
    const { id } = req.params;
    await Department.findByIdAndUpdate(id, { ...req.body });
    return res.json({ message: 'Updated TechStack successfully!' });
}

const deleteDepartment = async (req, res) => {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    return res.json({ message: 'delete successfully!' })
}

const searchDepartment = async (req, res) => {
    const q = req.query.mission;
    console.log(q);
    Department.find({ mission: { $regex: q, $options: '$i' } })
        .then(data => {
            res.json(data)
        })
}

module.exports = {
    createDepartment,
    editDepartment,
    deleteDepartment,
    searchDepartment,
    getDepartment
};
