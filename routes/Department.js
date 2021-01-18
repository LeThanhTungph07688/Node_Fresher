const express = require('express');
const router = express.Router();
const { createDepartment,
  editDepartment,
  deleteDepartment,
  getDepartment,
  getDepartmentId } = require('../controller/DepartmentController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/departments')
  .post(AuthMiddleware.isAuth, createDepartment)
  .get(AuthMiddleware.isAuth, getDepartment);

router.route('/departments/:id')
  .get(AuthMiddleware.isAuth, getDepartmentId)
  .put(AuthMiddleware.isAuth, editDepartment).
  delete(deleteDepartment);

module.exports = router;
