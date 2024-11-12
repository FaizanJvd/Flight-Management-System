const express = require('express');
const router = express.Router();
const authControllers = require("../controllers/authController");

router.post('/register', authControllers.registerUserController);

router.post('/login', authControllers.loginUserController);

module.exports = router;
