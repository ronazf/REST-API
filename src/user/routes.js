const Router = require('express-promise-router');
const validateToken = require('../middleware/token_handling/token_handler.js');
const controller = require('./controller.js');

const router = new Router();

router.post("/register", async(req, res) => {
    await controller.registerUser(req, res);
});

router.post("/login", async(req, res) => {
    await controller.loginUser(req, res);
});

router.put("/:id", validateToken, async(req, res) => {
    await controller.updateUser(req, res);
});

router.delete("/:id", validateToken, async(req, res) => {
    await controller.deleteUser(req, res);
});

module.exports = router;
