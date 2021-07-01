const ApiError = require('../exeptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next){
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) return next(ApiError.UnauthorizedError('User Unauthorized'));

        const token = authorizationHeader.split(' ')[1];
        if(!token) return next(ApiError.UnauthorizedError('User Unauthorized'));

        const userData = tokenService.validateToken(token);
        if(!userData) return next(ApiError.UnauthorizedError('User Unauthorized'));

        req.user = userData;
        next();

    } catch (e) {
        return next(ApiError.UnauthorizedError('User Unauthorized'));
    }
}
