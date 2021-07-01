const jwt = require('jsonwebtoken');
const TokenModel = require('../schemas/token')

module.exports.generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: '15s'})
    const tokenRefresh = jwt.sign(payload, process.env.JWT_TOKEN_REFRESH_SECRET, { expiresIn: '30d'});
    return {token, tokenRefresh}
}

module.exports.saveToken = async (userId, refreshToken) => {
    const tokenData = await TokenModel.findOne({userId: userId});
    if(tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }
    const token = new TokenModel({userId: userId, refreshToken});
    await token.save();
    return token;
}

module.exports.removeToken = async (refreshToken) => {
    const tokenData = await TokenModel.deleteOne({refreshToken});
    return  tokenData
}

module.exports.findToken = async (refreshToken) => {
    const tokenData = await TokenModel.findOne({refreshToken});
    return  tokenData;
}

module.exports.validateToken = (token) => {
    try{
        const  userData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        return userData
    } catch (e) {
        return null;
    }
}
module.exports.validateRefreshToken = (token) => {
    try{
        const  userData = jwt.verify(token, process.env.JWT_TOKEN_REFRESH_SECRET);
        return userData
    } catch (e) {
        return null;
    }
}

