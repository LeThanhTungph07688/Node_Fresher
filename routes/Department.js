const express = require('express');
const router = express.Router();
const { createDepartment,
    editDepartment,
    deleteDepartment,
    searchDepartment,
    getDepartment } = require('../controller/DepartmentController');



router.post('/departments', createDepartment);
router.get('/departments/:id', getDepartment);
router.put('/departments/:id', editDepartment);
router.delete('/departments/:id', deleteDepartment);
router.get('/departments', searchDepartment);


module.exports = router;