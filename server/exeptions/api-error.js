module.exports = class ApiError extends Error {

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static  UnauthorizedError(message){
        return new ApiError(401, message)
    }
    static  BadRequest(message, errors){
        return new ApiError(401, message, errors)
    }
}
