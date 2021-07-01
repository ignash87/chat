const UserChat = require('../schemas/user');
const bcrypt = require('bcryptjs');
const tokenService = require('../service/token-service');
const ApiError = require('../exeptions/api-error');

module.exports.registration = async ({ email, firstName, lastName, password }) => {
    const candidate = await UserChat.findOne({ email });

    if (candidate){
        throw ApiError.BadRequest(`Such a email ${ email } exists`)
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserChat({
        email,
        firstName,
        lastName,
        password: hashedPassword,
    });
    await newUser.save();
};

module.exports.login = async ({ email, password }) => {
    const user = await UserChat.findOne({ email });
    if (!user){
        throw ApiError.UnauthorizedError(`User with email ${email} is not found`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw ApiError.UnauthorizedError("Wrong password")
    }

    const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
    }
    const tokens = tokenService.generateToken({ userId: userData.id });
    await  tokenService.saveToken(userData.id, tokens.tokenRefresh)

    return { ...tokens, user: userData};
}

module.exports.logout = async (refreshToken) => {
    const token = await tokenService.removeToken(refreshToken);
    return token;
}

module.exports.refresh = async (refreshToken) => {
    if(!refreshToken) throw ApiError.UnauthorizedError('User Unauthorized');
    const userDataToken = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);

    if(!userDataToken || !tokenFromDb) throw ApiError.UnauthorizedError('User Unauthorized');

    const user = await UserChat.findById(userDataToken.userId);
    const userData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user._id
    }

    const tokens = tokenService.generateToken({userId: userData.id});
    await  tokenService.saveToken(userData.id, tokens.tokenRefresh)

    return { ...tokens, user: userData};

}
