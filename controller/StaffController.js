const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const ProjectType = require('../model/ProjectType');

const createStaff = async (req, res) => {
    try {
        console.log(req.body);
        const record = await Staff.create({ ...req.body });
        res.json({ record });
    } catch (error) {
        console.log(error.message);
        res.json(1)
    }
}

const getStaff = async (req, res) => {
    const { id } = req.params;
    const record = await Staff.findById(id);
    const tech_Stackrecord = await Tech_Stack.find(
        {
            _id: { $in: record.tech_stack }
        },
    );
    res.json({ record, tech_Stackrecord });
}

const editStaff = async (req, res) => {
    const { id } = req.params;
    await Staff.findByIdAndUpdate(id, { ...req.body });
    return res.json({ message: 'Updated Staff successfully!' })
}

const deleteStaff = async (req, res) => {
    const { id } = req.params;
    await Staff.findByIdAndDelete(id);
    return res.json({ message: 'delete successfully!' })
}

const searchStaff = async (req, res) => {
    const q = req.query.name;
    console.log(q);
    Staff.find({ name: { $regex: q, $options: '$i' } })
        .then(data => {
            res.json(data)
        })
}



module.exports = { createStaff, getStaff, editStaff, deleteStaff, searchStaff };