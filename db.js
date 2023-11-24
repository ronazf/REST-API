const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT,
    password: process.env.PASSWORD
});

module.exports = pool;
