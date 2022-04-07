const express = require("express");
const courseController = require("../controllers/courseController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

//@route GET /v1/course
//@desc Get all courses
//@access ADMIN
router.get("/", authMiddleware.verifyAdmin, courseController.getCourses);

//@route POST /v1/course/create
//@desc Create new course
//@access ADMIN
router.post(
  "/create",
  authMiddleware.verifyAdmin,
  courseController.createCourse
);

//@route PUT /v1/course/edit/:id
//@desc Edit course
//@access ADMIN
router.put(
  "/edit/:id",
  authMiddleware.verifyAdmin,
  courseController.editCourse
);

//@route DELETE /v1/course/delete/:id
//@desc Delete course
//@access ADMIN
router.delete(
  "/delete/:id",
  authMiddleware.verifyAdmin,
  courseController.deleteCourse
);

module.exports = router;
