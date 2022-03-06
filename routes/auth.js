const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

// @route POST /v1/register
// @desc Register new user
// @access PUBLIC

router.post("/register", authController.registerUser);

// @route POST /v1/auth/login
// @desc Login user
// @access PUBLIC

router.post("/login", authController.loginUser);
// @route GET /v1/auth/login
// @desc Login user
// @access PUBLIC

router.get("/", verifyToken, authController.checkUser);
// @route GET /v1/auth
// @desc Check user
// @access PRIVATE

module.exports = router;
