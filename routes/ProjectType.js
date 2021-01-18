const express = require('express');
const router = express.Router();
const { createProjectType,
  editProjectType,
  deleteProjectType,
  listProjectType,
  getProjectTypeId } = require('../controller/PojectTypeController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/projectTypes')
  .post(AuthMiddleware.isAuth, createProjectType)
  .get(AuthMiddleware.isAuth, listProjectType);
router.route('/projectTypes/:id')
  .put(AuthMiddleware.isAuth, editProjectType)
  .delete(AuthMiddleware.isAuth, deleteProjectType)
  .get(AuthMiddleware.isAuth, getProjectTypeId);

module.exports = router;
