const TechStack = require('../model/Tech_Stack');
const mongoose = require('mongoose');

const createTechStack = async (req, res) => {
    try {
        console.log(req.body);
        const record = await TechStack.create({ ...req.body });
        res.json({ record, message: 'create successfully!', status: 200 });
    } catch (error) {
        console.log(error.message);
        res.json({ message: 'create failed!' })
    }
}

const editTechStack = async (req, res) => {
    const { id } = req.params;
    await TechStack.findByIdAndUpdate(id, { ...req.body });
    return res.json({ message: 'Updated TechStack successfully!' });
}

const deleteTechStack = async (req, res) => {
    const { id } = req.params;
    await TechStack.findByIdAndDelete(id);
    return res.json({ message: 'delete successfully!' })
}

const searchTechStack = async (req, res) => {
    const q = req.query.name;
    console.log(q);
    TechStack.find({ name: { $regex: q, $options: '$i' } })
        .then(data => {
            res.json(data)
        })
}

module.exports = { createTechStack, editTechStack, deleteTechStack, searchTechStack };
