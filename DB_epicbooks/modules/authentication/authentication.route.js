const express = require("express");

const router = express.Router();

const authenticationController = require("./authentication.controller");

router.post("/auth/login", authenticationController.login);

module.exports = router;
