const express = require('express');
const router = express.Router();
const {
    authenticateSchema,
    authenticate,
    refreshToken,
    revokeTokenSchema,
    revokeToken,
    getAll,
    getById,
    getRefreshTokens,
} = require('../controller/UserController');
const { authorize } = require('../middleware/Authorize');

const Role = require('../helper/role');
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/refresh-token', refreshToken);
router.post('/revoke-token', authorize(), revokeTokenSchema, revokeToken);
router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.get('/:id/refresh-tokens', authorize(), getRefreshTokens);

module.exports = router;