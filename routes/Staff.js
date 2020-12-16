const express = require('express');
const router = express.Router();
const { createStaff,
    getStaff,
    editStaff,
    deleteStaff,
    searchStaff } = require('../controller/StaffController');

const AuthMiddleware = require('../middleware/AuthMiddleware');


router.post('/staffs', AuthMiddleware.isAuth, createStaff);
router.get('/staffs/:id', getStaff);
// router.get('/staffs/:id', AuthMiddleware.isAuth, getStaff);
router.put('/staffs/:id', editStaff);
router.delete('/staffs/:id', deleteStaff);
router.get('/staffs', searchStaff);


module.exports = router;