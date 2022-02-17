const Lesson = require("../modals/Lesson");

const lessonController = {
  createLesson: async (req, res) => {
    const { driveUrl, formUrl, title } = req.body;

    if (!driveUrl || !formUrl || !title) {
      return res.status(400).json({
        success: false,
        message: "Missing Title or/and urls!!!",
      });
    }

    try {
      const newLesson = new Lesson({
        title,
        driveUrl,
        formUrl,
      });
      await newLesson.save();
      res.json({
        success: true,
        message: "Happy Learning!!!",
        lesson: newLesson,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  getLessons: async (req, res) => {
    try {
      const lessons = await Lesson.find({});
      res.json({ success: true, lessons });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
  deleteLesson: async (req, res) => {
    const lessonId = req.params.id;
    try {
      const deletedLesson = await Lesson.findOneAndDelete({ _id: lessonId });
      console.log("deletedLesson", deletedLesson);
      if (!deletedLesson)
        return res
          .status(400)
          .json({ success: false, message: "Lesson not found!" });

      res.json({
        success: true,
        message: "Delete successfully!!",
        deletedLesson,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error!" });
    }
  },
  updateLesson: async (req, res) => {
    const { title, driveUrl, formUrl } = req.body;
    if (!title || !driveUrl || !formUrl)
      return res
        .status(400)
        .json({ success: false, message: "Missing title and/or urls!" });

    let updatedLesson = {
      title,
      driveUrl,
      formUrl,
    };

    try {
      updatedLesson = await Lesson.findByIdAndUpdate(
        req.params.id,
        updatedLesson,
        { new: true }
      );

      res.json({
        success: true,
        message: "Updated successfully!",
        lesson: updatedLesson,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  },
};

module.exports = lessonController;
