const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const ProjectType = require('../model/ProjectType');
const Department = require('../model/Department');
const Project = require('../model/Project');
const moment = require('moment');
const { getSuccess } = require('../helper/Config_Message');
const { logger } = require('../helper/Winston');


const CountProject = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (startDate === '' || endDate === '') {
            return res.status(400).json({
                message: 'Please ensure you pick two dates'
            })
        };

        const findProject = await Project.find({
            createdAt: {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
        }).sort({ createdAt: 'asc' });
        const len = findProject.length;
        if (len <= 0) {
            return res.status(404).json({
                message: 'Could not retrieve Project'
            })
            logger.error(error.message);
        }
        res.status(200).json({
            message: 'success',
            data: { findProject, len }
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
        logger.error(error.message);
    }
}

const StaffFill = async (req, res) => {
    try {
        const data = await Staff.find();
        const len = data.length;
        if (len <= 0) {
            return res.status(404).json({
                message: 'Could not retrieve Staff'
            })
        }
        res.status(200).json({
            message: 'success',
            data: { data, len }
        })
    } catch (error) {
        res.json(error.message);
        logger.error(error.message);
    }
}

module.exports = { CountProject, StaffFill };