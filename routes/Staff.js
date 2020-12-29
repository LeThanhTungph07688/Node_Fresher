const express = require('express');
const router = express.Router();
const { createStaff,
    getStaff,
    editStaff,
    deleteStaff,
    getStaffId,
    searchStaff } = require('../controller/StaffController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/staffs')
    .post(AuthMiddleware.isAuth, createStaff)
    .get(AuthMiddleware.isAuth, getStaff)
router.route('/staffs/:id')
    .get(AuthMiddleware.isAuth, getStaffId)
    .put(AuthMiddleware.isAuth, editStaff)
    .delete(AuthMiddleware.isAuth, deleteStaff)

module.exports = router;