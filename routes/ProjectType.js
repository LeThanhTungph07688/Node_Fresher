const express = require('express');
const router1 = express.Router();
const { createProjectType, editProjectType, deleteProjectType, searchProjectType } = require('../controller/PojectTypeController');

router1.post('/projectTypes', createProjectType);
router1.put('/projectTypes/:id', editProjectType);
router1.delete('/projectTypes/:id', deleteProjectType);
router1.get('/projectTypes', searchProjectType);


module.exports = router1;