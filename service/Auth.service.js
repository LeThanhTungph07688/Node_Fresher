const User = require('../model/User');
const jwtHelper = require('../helper/jwt.helper');
const tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const { insert,
  findOne } = require('./QueryAll');
const { postSuccess,
  errorHandle } = require('../helper/Config_Message');

const signUpUser = async (payload) => {
  try {
    const newUser = await findOne(User, { email: payload.email });
    if (newUser) {
      return errorHandle(400, 'INVALID', 'Users is already');
    }
    const record = await insert(User, payload);
    return postSuccess(record);
  } catch (error) {
    res.json(error);
  }
};

const loginUser = async (payload) => {
  try {
    const user = await findOne(User, { email: payload.email });
    if (!user) {
      return errorHandle(404, 'INVALID', 'User Not Found');
    }
    const validate = await user.isValidPassword(payload.password);
    if (!validate) {
      return errorHandle(404, 'INVALID', 'Wrong Password');
    }
    const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
    const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
    tokenList[refreshToken] = { accessToken, refreshToken };
    return postSuccess({ accessToken, refreshToken });
  } catch (err) {
    res.status(err.status).json(err);
  }
};

const refreshTokenUser = async (payload) => {
  const refreshTokenFromClient = payload.refreshToken;
  console.log(tokenList[refreshTokenFromClient]);
  if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
    try {
      const user = await User.findOne({ email: payload.email });
      console.log(user);
      const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
      return res.status(200).json({ accessToken });
    } catch (error) {
      res.status(403).json(error.message);
    }
  }
  return errorHandle(403, 'INVALID', 'No Token Provided');
};
module.exports = {
  signUpUser,
  loginUser,
  refreshTokenUser
};
