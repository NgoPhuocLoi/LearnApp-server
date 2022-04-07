const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/userController");

//@route PUT /v1/user/update
//@desc Update user information
//@access PRIVATE
router.put("/update", authMiddleware.verifyToken, userController.updateInfo);

module.exports = router;
