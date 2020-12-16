const express = require('express');
const router = express.Router();
const { signUp,
    login,
    refreshToken } = require('../controller/AuthController');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refershToken', refreshToken);

module.exports = router;