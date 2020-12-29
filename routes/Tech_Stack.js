const express = require('express');
const router = express.Router();
const { createTechStack,
    editTechStack,
    deleteTechStack,
    searchTechStack,
    listTechStack,
    getTechStackId } = require('../controller/Tech_StackController');

const AuthMiddleware = require('../middleware/AuthMiddleware');

router.route('/techstacks')
    .post(AuthMiddleware.isAuth, createTechStack)
    .get(AuthMiddleware.isAuth, listTechStack)

router.route('/techstackss').get(AuthMiddleware.isAuth, searchTechStack)

router.route('/techstacks/:id')
    .put(AuthMiddleware.isAuth, editTechStack)
    .delete(AuthMiddleware.isAuth, deleteTechStack)
    .get(AuthMiddleware.isAuth, getTechStackId);

module.exports = router;