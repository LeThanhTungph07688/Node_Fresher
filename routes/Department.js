const express = require('express');
const router = express.Router();
const { createDepartment,
    editDepartment,
    deleteDepartment,
    searchDepartment,
    getDepartment,
    getSkillId } = require('../controller/DepartmentController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/departments')
    .post(AuthMiddleware.isAuth, createDepartment)
    .get(AuthMiddleware.isAuth, getDepartment);

router.route('/departments/:id')
    .get(AuthMiddleware.isAuth, getSkillId)
    .put(AuthMiddleware.isAuth, editDepartment).
    delete(deleteDepartment);

module.exports = router;