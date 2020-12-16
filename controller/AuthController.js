const User = require('../model/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwtHelper = require("../helper/jwt.helper");
const tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const { getSuccess,
    postSuccess,
    putSuccess,
    deleteSuccess,
    searchSuccess,
    notFound } = require('../helper/Config_Message');

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
    const user = await User.findOne({ email: req.body.email });
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // Nếu như tồn tại refreshToken truyền lên 
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            // Verify kiểm tra tính hợp lệ của  refreshToken 
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            user = decoded.data;
            const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};
module.exports = {
    signUp,
    login,
    refreshToken
};


