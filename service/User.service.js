const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const RefreshToken = require('../model/Token');
const secret = 'access - token - secret - example - green - cat - a@';
const db = require('../helper/Connect');

const authenticate = async ({ email, password, ipAddress }) => {
    const user = await db.User.findOne({ email });
    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user, ipAddress);

    // save refresh token
    (await refreshToken).save

    // return basic details and tokens
    return {
        ...basicDetails(user),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

const refreshToken = async ({ token, ipAddress }) => {
    const refreshToken = await getRefreshToken(token);
    const { user } = refreshToken;
    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();
    // generate new jwt
    const jwtToken = generateJwtToken(user);
    // return basic details and tokens
    return {
        ...basicDetails(user),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

const revokeToken = async ({ token, ipAddress }) => {
    const refreshToken = await getRefreshToken(token);
    // revoke token and save
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    await refreshToken.save();
};

const getAll = async () => {
    const users = await db.User.find();
    return users.map(x => basicDetails(x));
}

const getById = async (id) => {
    const user = await getUser(id);
    return basicDetails(user);
}

const getRefreshTokens = async (userId) => {
    // check that user exists
    await getUser(userId);
    // return refresh tokens for user
    const refreshTokens = await db.RefreshToken.find({ user: userId });
    return refreshTokens;
}

// helper consts
const getUser = async (id) => {
    if (!db.isValidId(id)) throw 'User not found';
    const user = await db.User.findById(id);
    if (!user) throw 'User not found';
    return user;
}
const getRefreshToken = async (token) => {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
    return refreshToken;
}
const generateJwtToken = async (user) => {
    // create a jwt token containing the user id that expires in 150 minutes
    return jwt.sign({ sub: user.id, id: user.id }, secret, { expiresIn: '150m' });
}
const generateRefreshToken = async (user, ipAddress) => {
    // create a refresh token that expires in 7 days
    return new RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdByIp: ipAddress
    });
}
const randomTokenString = async () => {
    return crypto.randomBytes(40).toString('hex');
}
const basicDetails = async (user) => {
    const { id, email, password, role } = user;
    return { id, email, password, role };
}

module.exports = {
    authenticate,
    refreshToken,
    revokeToken,
    getAll,
    getById,
    getRefreshTokens
};