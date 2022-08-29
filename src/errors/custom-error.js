class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createHttpError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
};

module.exports = { createHttpError, CustomAPIError };