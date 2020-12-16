const Staff = require('../model/Staff');
const mongoose = require('mongoose');
const Tech_Stack = require('../model/Tech_Stack');
const ProjectType = require('../model/ProjectType');
const Department = require('../model/Department');
const Project = require('../model/Project');
const moment = require('moment');
const { Count } = require('../helper/LengthArray');
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess,
    notFound } = require('../helper/Config_Message');

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
        const len = Count(findProject);
        if (len <= 0) {
            return res.status(404).json({
                message: 'Could not retrieve Project'
            })
        }
        res.status(200).json({
            message: 'success',
            data: { findProject, len }
        })

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}
module.exports = { CountProject };