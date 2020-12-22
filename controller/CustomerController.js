const Customer = require('../model/Customer');
const mongoose = require('mongoose');
const { logger } = require('../helper/Winston');
const {
    postSuccess,

    deleteSuccess,
    searchSuccess } = require('../helper/Config_Message');


const createCustomer = async (req, res) => {
    try {
        const record = await Customer.create({ ...req.body });
        res.json(postSuccess(record));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }

}

const editCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Customer.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Department.findByIdAndDelete(id);
        res.json(deleteSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

const searchCustomer = async (req, res) => {
    try {
        const q = req.query.name;
        const data = await Customer.find({ name: { $regex: q, $options: '$i' } });
        res.json(searchSuccess(data));
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

module.exports = {
    createCustomer,
    editCustomer,
    deleteCustomer,
    searchCustomer
};
