const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const verifyToken = require("../middlewares/auth");

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

// @route PUT /v1/lessons/complete/add/:id
// @desc Add lesson
// @access PRIVATE
router.put("/complete/add/:id", verifyToken, lessonController.addDoneLesson);

// @route PUT /v1/lessons/complete/remove/:id
// @desc Remove lesson
// @access PRIVATE
router.put(
  "/complete/remove/:id",
  verifyToken,
  lessonController.removeDoneLesson
);

module.exports = router;
