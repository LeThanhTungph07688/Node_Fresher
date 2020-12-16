const express = require('express');
const router = express.Router();
const { CountProject } = require('../controller/ReportController');



router.get('/reports', CountProject);

module.exports = router;