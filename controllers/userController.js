const User = require("../modals/User");

const userController = {
  updateInfo: async (req, res) => {
    const { type, displayName, email, avatar } = req.body;

    if (!type)
      return res
        .status(400)
        .json({ success: false, message: "Missing type update!!" });

    let data;
    switch (type) {
      case "displayName":
        data = displayName;
        break;
      case "email":
        data = email;
        break;
      case "avatar":
        data = avatar;
        break;
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { [type]: data },
        { new: true }
      );

      if (!updatedUser)
        return res.status(401).json({
          success: false,
          message: "User not found or not authorized!",
        });
      res.json({
        success: true,
        message: "Updated successfully!",
        user: updatedUser,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({
        success: false,
        message: "Internal server error at update displayName",
      });
    }
  },
};

module.exports = userController;
