const express = require('express');
const router = express.Router();
const { createCustomer,
    editCustomer,
    deleteCustomer,
    searchCustomer } = require('../controller/CustomerController');

router.post('/customer', createCustomer);
router.put('/customer/:id', editCustomer);
router.delete('/customer/:id', deleteCustomer);
router.get('/customer', searchCustomer);


module.exports = router;