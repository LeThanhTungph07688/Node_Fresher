const express = require('express');
const router = express.Router();
const { createCustomer,
  editCustomer,
  removeCustomer,
  listCustomer,
  listOne } = require('../controller/CustomerController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/customers')
  .post(AuthMiddleware.isAuth, createCustomer)
  .get(AuthMiddleware.isAuth, listCustomer);

router.route('/customers/:id')
  .put(AuthMiddleware.isAuth, editCustomer)
  .delete(AuthMiddleware.isAuth, removeCustomer)
  .get(AuthMiddleware.isAuth, listOne);

module.exports = router;
