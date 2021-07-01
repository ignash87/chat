const UserChat = require('../schemas/user');
const userService = require('../service/user-service')

module.exports.registration = async function (req, res, next) {
    try {
        await userService.registration(req.body)
        return res.status(201).json({message: "User created"})
    } catch (e) {
        next(e)
    }
};

module.exports.login = async function (req, res, next) {
    try {
        const userData = await userService.login(req.body);
        res.cookie('refreshToken', userData.tokenRefresh, {maxAge: 30*24*60*60*100, httpOnly: true});
        return res.status(200).json(userData)
    } catch (e) {
        next(e)
    }
}

module.exports.logout = async function (req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.tokenRefresh, {maxAge: 30*24*60*60*100, httpOnly: true});
        return res.status(200).json(userData)
    } catch (e) {
        next(e);
    }
};


module.exports.refresh = async function (req, res, next) {
    try {
        const {refreshToken} = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.tokenRefresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData);
    } catch (e) {
        next(e);
    }
};


module.exports.userAuth = async function (req, res, next){
    try {
        const { userId } = req.user;
        const user = await UserChat.findOne({_id: userId});

        const responseData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user._id
        }
        return res.status(200).json({message: "User logged in", user: responseData})
    } catch (e) {
        next(e);
    }
}

