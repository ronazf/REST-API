const constants = require("../../constants");
const pool = require('../../db.js');
const ErrorDetail = require('../middleware/error_handling/error_detail.js');
const queries = require('./queries.js');
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const successDetail = require("../middleware/success_handling/success_detail");
const Success = require("../middleware/success_handling/success");

const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
        res.status(ErrorDetail.CONFLICT.status);
        throw new Error("Duplicate Email");
    };
    if (!username || !email || !password) {
        res.status(ErrorDetail.BAD_REQUEST.status)
        throw new Error("All fields are mandetory");
    };

    const hashedPassword = await encryptPassword(password);
    await new Promise((resolve, reject) => {
        pool.query(queries.addUser, [username, email, hashedPassword], (error, _) => {
            if (error) {
                return reject(error);
            };

            return resolve(res
                .status(successDetail.CREATED.status)
                .json(new Success("User created successfully"))
            );
        });
    });
});

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const validPassword = await argon2.verify(password, user.password);
    const user = await getUserByEmail(email);
    if (!email || !password) {
        res.status(ErrorDetail.BAD_REQUEST.status)
        throw new Error("All fields are mandetory");
    };
    if (!user || !validPassword) {
        res.status(ErrorDetail.UNAUTHORIZED.status);
        throw new Error("Invalid credentials");
    };

    const accessToken = jwt.sign(
        {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_VALID_DURATION }
    );
    res.status(successDetail.OK.status)
        .json(new Success("User authenticated", {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token: accessToken,
            duration: process.env.JWT_VALID_DURATION
        }));
});

const updateUser = asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const { username, email } = req.body;
    const validUser = await checkUserExists(id);
    if (!validUser) {
        res.status(ErrorDetail.BAD_REQUEST.status)
        throw new Error(`No user found with id = ${id}`);
    };
    await new Promise((resolve, reject) => {
        pool.query(queries.updateUser, [id, username, email], (error, results) => {
            if (error) {
                return reject(error);
            };
            return resolve(res
                .status(successDetail.CREATED.status)
                .json(new Success("User updated successfully."))
            );
        });
    });
});

const deleteUser = asyncHandler(async(req, res) => {
    const id = parseInt(req.params.id);
    const validUser = await checkUserExists(id);
    if (!validUser) {
        res.status(ErrorDetail.BAD_REQUEST.status)
        throw new Error(`No user found with id = ${id}`);
    };
    await new Promise((resolve, reject) => {
        pool.query(queries.deleteUser, [id], (error, results) => {
            if (error) {
                return reject(error);
            };
            return resolve(res
                .status(successDetail.CREATED.status)
                .json(new Success("User deleted successfully."))
            );
        });
    });
});

const getUserByEmail = async(email) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.getUsersByEmail, [email], (error, results) => {
            if (error) {
                return reject(error);
            };
            const user = results.rows.length == 0 ? null : results.rows[0];
            return resolve(user);
        });
    });
};

const checkUserExists = async(id) => {
    return new Promise((resolve, reject) => {
        pool.query(queries.getUsersById, [id], (error, results) => {
            if (error) {
                return reject(error);
            };
            return resolve(results.rows.length != 0)
        });
    });
};

const encryptPassword = async(password) => {
    return new Promise((resolve, reject) => {
        argon2.hash(password, constants.SALT_ROUNDS, (error, hash) => {
            if (error) {
                return reject(error);
            };
            return resolve(hash);
        });
    });
};

module.exports = {
    registerUser,
    updateUser,
    deleteUser,
    loginUser
};
