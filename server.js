const express = require("express");
const errorHandler = require("./src/middleware/error_handling/error_handler");
const userRoutes = require("./src/user/routes.js");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1/users', userRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
