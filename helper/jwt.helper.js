
const jwt = require("jsonwebtoken");

const generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        const userData = {
            email: user.email,
            password: user.password
        }

        jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
}
const generateRefeshToken = (secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        const userData = {
            email: user.email,
            password: user.password
        }

        jwt.sign(
            { data: userData },
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
}

const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    generateRefeshToken
};