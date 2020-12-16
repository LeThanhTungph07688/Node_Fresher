const express = require('express');
const router = express.Router();
const { createCustomer,
    editCustomer,
    deleteCustomer,
    searchCustomer } = require('../controller/CustomerController');

// router.use(require('../middleware/tokenChecker'));

router.post('/customers', createCustomer);
router.put('/customers/:id', editCustomer);
router.delete('/customers/:id', deleteCustomer);
router.get('/customers', searchCustomer);


module.exports = router;