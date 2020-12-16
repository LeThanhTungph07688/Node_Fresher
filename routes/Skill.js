const express = require('express');
const router = express.Router();
const { createSkill,
    getSkill,
    editSkill,
    deleteSkill,
    searchSkill } = require('../controller/SkillController');



router.post('/skills', createSkill);
router.get('/skills/:id', getSkill);
router.put('/skills/:id', editSkill);
router.delete('/skills/:id', deleteSkill);
router.get('/skills', searchSkill);


module.exports = router;