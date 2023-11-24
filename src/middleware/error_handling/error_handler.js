const constants = require("../../../constants");
const Error = require("./error");
const ErrorDetail = require("./error_detail");

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    const errorDetail = getErrorTitle(statusCode);

    if (errorDetail.title) {
        res.json(
            new Error(
                errorDetail.title,
                error.message,
                error.stack
            )
        );
    }
};

const getErrorTitle = (statusCode) => {
    switch (statusCode) {
        case ErrorDetail.BAD_REQUEST.status:
            return ErrorDetail.BAD_REQUEST;
        case ErrorDetail.UNAUTHORIZED.status:
            return ErrorDetail.UNAUTHORIZED;
        case ErrorDetail.FORBIDDEN.status:
            return ErrorDetail.FORBIDDEN;
        case ErrorDetail.NOT_FOUND.status:
            return ErrorDetail.NOT_FOUND;
        case ErrorDetail.REQUEST_TIMEOUT.status:
            return ErrorDetail.REQUEST_TIMEOUT;
        case ErrorDetail.CONFLICT.status:
            return ErrorDetail.CONFLICT;
        case ErrorDetail.INTERNAL_SERVER.status:
            return ErrorDetail.INTERNAL_SERVER;
        case constants.OK, constants.CREATED:
            return null;
        default:
            return ErrorDetail.INTERNAL_SERVER;
    };
};

module.exports = errorHandler;
