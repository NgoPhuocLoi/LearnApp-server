const Folder = require("../modals/Folder");
const Lesson = require("../modals/Lesson");

const folderController = {
  getFolders: async (req, res) => {
    try {
      const folders = await Folder.find({}).populate("user", [
        "username",
        "isAdmin",
      ]);
      res.json({ success: true, folders });
    } catch (error) {
      console.log("error at get folders: ", error);
      res.status(500).json({
        success: false,
        message: "Internal server error at get folders",
      });
    }
  },
  createFolder: async (req, res) => {
    const { title } = req.body;
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Missing title of folder!!!" });

    const newFolder = new Folder({
      title,
      user: req.userId,
    });

    try {
      await newFolder.save();

      res.json({
        success: true,
        message: "Folder created successfully!!",
        folder: newFolder,
      });
    } catch (error) {
      console.log("error at create Folder: ", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
  deleteFolder: async (req, res) => {
    const deleteFolderCondition = { _id: req.params.id, user: req.userId };
    try {
      const deletedFolder = await Folder.findOneAndDelete(
        deleteFolderCondition
      );
      // delete lessons in folder
      await Lesson.findOneAndDelete({ folder: req.params.id });

      if (!deletedFolder)
        return res.status(401).json({
          success: false,
          message: "Folder not found or user not authorized",
        });

      res.json({ success: true, message: "Delete successfully!!!" });
    } catch (error) {
      console.log("error at delete folder", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error at Delete Folder",
      });
    }
  },
  editFolder: async (req, res) => {
    const { title } = req.body;
    if (!title)
      return res
        .status(400)
        .json({ success: false, message: "Missing folder title!" });

    const editFolderCondition = { _id: req.params.id, user: req.userId };
    try {
      const editedFolder = await Folder.findOneAndUpdate(
        editFolderCondition,
        { title: title },
        { new: true }
      );
      if (!editedFolder)
        return res.status(401).json({
          success: false,
          message: "Folder not found or user not authorized!",
        });

      res.json({
        success: true,
        message: "Edited Successfully!!",
        folder: editedFolder,
      });
    } catch (error) {
      console.log("error at edit Folder: ", error);
      res.status(500).json({
        success: false,
        message: "Internal server error at edit folder",
      });
    }
  },
};

module.exports = folderController;
