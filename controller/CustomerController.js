const Customer = require('../model/Customer');
const mongoose = require('mongoose');


const createCustomer = async (req, res) => {
    console.log(req.body);
    const record = await Customer.create({ ...req.body })
    res.json({ record })
}

const editCustomer = async (req, res) => {
    const { id } = req.params;
    await Customer.findByIdAndUpdate(id, { ...req.body });
    return res.json({ message: 'Updated Customer successfully!' })
}

const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    return res.json({ message: 'delete successfully!' })
}

const searchCustomer = async (req, res) => {
    const q = req.query.name;
    console.log(q);
    Customer.find({ name: { $regex: q, $options: '$i' } })
        .then(data => {
            res.json(data)
        })
}

module.exports = { createCustomer, editCustomer, deleteCustomer, searchCustomer };
