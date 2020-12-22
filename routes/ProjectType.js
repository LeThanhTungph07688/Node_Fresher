const express = require('express');
const router = express.Router();
const { createProjectType,
    editProjectType,
    deleteProjectType,
    searchProjectType,
    listProjectType } = require('../controller/PojectTypeController');



router.post('/projectTypes', createProjectType);
router.put('/projectTypes/:id', editProjectType);
router.delete('/projectTypes/:id', deleteProjectType);
router.get('/projectTypess', searchProjectType);
router.get('/projectTypes', listProjectType);


module.exports = router;