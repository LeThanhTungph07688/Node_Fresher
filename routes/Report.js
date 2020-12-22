const express = require('express');
const router = express.Router();
const { CountProject, StaffFill } = require('../controller/ReportController');



router.get('/reports', CountProject);
router.get('/staffill', StaffFill);

module.exports = router;