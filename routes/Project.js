const express = require('express');
const router = express.Router();
const { createProject,
    getProject,
    editProject,
    deleteProject } = require('../controller/ProjectController');



router.post('/projects', createProject);
router.get('/projects/:id', getProject);
router.put('/projects/:id', editProject);
router.delete('/projects/:id', deleteProject);
// router.get('/projects', searchStaff);


module.exports = router;