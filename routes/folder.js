const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");
const folderController = require("../controllers/folderController");

//@route POST /v1/folder
//@desc Create new folder
//access PRIVATE
router.get("/", verifyToken, folderController.getFolders);

//@route POST /v1/folder/create
//@desc Create new folder
//access PRIVATE
router.post("/create", verifyToken, folderController.createFolder);

//@route DELETE /v1/folder/:id
//@desc Delete folder
//access PRIVATE
router.delete("/:id", verifyToken, folderController.deleteFolder);

//@route PUT /v1/folder/:id
//@desc Edit folder
//access PRIVATE
router.put("/:id", verifyToken, folderController.editFolder);

module.exports = router;
