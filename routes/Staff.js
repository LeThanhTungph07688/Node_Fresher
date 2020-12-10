const express = require('express');
const router = express.Router();
const { createStaff, getStaff, editStaff, deleteStaff, searchStaff } = require('../controller/StaffController');

router.post('/staff', createStaff);
router.get('/staff/:id', getStaff);
router.put('/staff/:id', editStaff);
router.delete('/staff/:id', deleteStaff);
router.get('/staff', searchStaff);


module.exports = router;