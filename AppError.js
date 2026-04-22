// bkav haihs : tạo custom error - start
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
// bkav haihs : tạo custom error - end

module.exports = AppError;