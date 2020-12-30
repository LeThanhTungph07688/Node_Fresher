const express = require('express');
const router = express.Router();
const { createProject,
    getProject,
    editProject,
    deleteProject,
    searchProject,
    getProjectId } = require('../controller/ProjectController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/projects')
    .post(AuthMiddleware.isAuth, createProject)
    .get(AuthMiddleware.isAuth, searchProject)

router.route('/projectss').get(AuthMiddleware.isAuth, getProject)

router.route('/projects/:id')
    .get(AuthMiddleware.isAuth, getProjectId)
    .put(AuthMiddleware.isAuth, editProject)
    .delete(AuthMiddleware.isAuth, deleteProject)

module.exports = router;