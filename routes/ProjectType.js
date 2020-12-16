const express = require('express');
const router = express.Router();
const { createProjectType,
    editProjectType,
    deleteProjectType,
    searchProjectType } = require('../controller/PojectTypeController');



router.post('/projectTypes', createProjectType);
router.put('/projectTypes/:id', editProjectType);
router.delete('/projectTypes/:id', deleteProjectType);
router.get('/projectTypes', searchProjectType);


module.exports = router;