const ErrorDetail = {
    BAD_REQUEST: { title: "Bad Request", status: 400 },
    UNAUTHORIZED: { title: "Unauthorized", status: 401 },
    FORBIDDEN: { title: "Forbidden", status: 403 },
    NOT_FOUND: { title: "Not Found", status: 404 },
    REQUEST_TIMEOUT: { title: "Request Timeout", status: 408 },
    CONFLICT: { title: "Conflict", status: 409 },
    INTERNAL_SERVER: { title: "Internal Server", status: 500 }
}

module.exports = ErrorDetail;
