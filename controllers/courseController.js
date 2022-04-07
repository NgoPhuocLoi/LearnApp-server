const Course = require("../modals/Course");

const courseController = {
  getCourses: async (req, res) => {
    try {
      const courses = await Course.find({});
      res.json({ success: true, courses });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error at Get Courses",
      });
    }
  },
  createCourse: async (req, res) => {
    const { name, description, thumb, status } = req.body;

    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Missing course's name" });

    const newCourse = new Course({
      name,
      description,
      thumb,
      status,
    });

    try {
      await newCourse.save();

      res.json({
        success: true,
        message: "Create successfully!",
        course: newCourse,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal error message at create course",
      });
    }
  },
  editCourse: async (req, res) => {
    const { name, description, thumb, status } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: "Missing course's name" });
    const courseForm = {
      name,
      description,
      thumb,
      status,
    };

    try {
      const editedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        courseForm,
        { new: true }
      );
      if (!editedCourse)
        return res
          .status(400)
          .json({ success: false, message: "Course not found" });
      res.json({
        success: true,
        message: "Update successfully!",
        course: editedCourse,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error at Edit Course!",
      });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);

      if (!deletedCourse)
        return res
          .status(400)
          .json({ success: false, message: "Course not found!" });

      res.json({
        success: true,
        message: "Delete successfully",
        course: deletedCourse,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error at Delete Course",
        });
    }
  },
};

module.exports = courseController;
