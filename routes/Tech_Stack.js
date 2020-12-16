const express = require('express');
const router = express.Router();
const { createTechStack,
    editTechStack,
    deleteTechStack,
    searchTechStack } = require('../controller/Tech_StackController');



router.post('/techstacks', createTechStack);
router.put('/techstacks/:id', editTechStack);
router.delete('/techstacks/:id', deleteTechStack);
router.get('/techstacks', searchTechStack);


module.exports = router;