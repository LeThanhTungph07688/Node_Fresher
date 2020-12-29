const express = require('express');
const router = express.Router();
const { CountProject, StaffFill } = require('../controller/ReportController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.get('/reports', AuthMiddleware.isAuth, CountProject);
router.get('/staffill', AuthMiddleware.isAuth, StaffFill);

module.exports = router;