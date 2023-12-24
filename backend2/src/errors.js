
class AppError extends Error {
    constructor(message, status, code = null) {
        super(message);
        this.code = code;
        this.status = status;
    }
}

module.exports = { AppError: AppError }