const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

// @route POST /v1/lessons
// @desc Create new lesson
// @access PUBLIC
router.post("/", lessonController.createLesson);

// @route GET /v1/lessons
// @desc Get all lessons
// @access PUBLIC
router.get("/", lessonController.getLessons);

// @route DELETE /v1/lessons/:id
// @desc Delete lesson
// @access PUBLIC
router.delete("/:id", lessonController.deleteLesson);

// @route PUT /v1/lessons/:id
// @desc Update lesson
// @access PUBLIC
router.put("/:id", lessonController.updateLesson);

module.exports = router;
