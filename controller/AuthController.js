const User = require('../model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtHelper = require("../helper/jwt.helper");
const tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;


const signUp = async (req, res) => {
    try {
        const newUser = await User.create({ ...req.body });
        res.json(newUser);
    } catch (error) {
        res.json(error)
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw { status: 404, message: 'User not found', message_code: 'INVALID' };
        }
        const validate = await user.isValidPassword(req.body.password);
        if (!validate) {
            throw new Error('Wrong Password');
        }
        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        tokenList[refreshToken] = { accessToken, refreshToken };
        return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
        res.status(err.status).json(err)
    }
}
const refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            const user = await User.findOne({ email: req.body.email });
            const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
            return res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json(error.message);
        }
    } else {

        return res.status(403).send({
            message: 'No token provided.'
        });
    }
};
module.exports = {
    signUp,
    login,
    refreshToken
};


