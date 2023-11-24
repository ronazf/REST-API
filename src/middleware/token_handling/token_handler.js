const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const constants = require("../../../constants");
const ErrorDetail = require("../error_handling/error_detail");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) {
        res.status(ErrorDetail.BAD_REQUEST.status);
        throw new Error("Missing authentication token");
    };
    if (authHeader && authHeader.startsWith(constants.AUTH_BEGIN)) {
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(ErrorDetail.UNAUTHORIZED.status).json("Invalid token");
        };
        await new Promise((_, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (error, _) => {
                if (error) {
                    res.status(ErrorDetail.UNAUTHORIZED.status);
                    return reject(error);
                }
                next();
            });
        });
    };
});

module.exports = validateToken;
