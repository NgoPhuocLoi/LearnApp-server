const User = require("../modals/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const authController = {
  registerUser: async (req, res) => {
    const { username, password, passwordConfirm, displayName } = req.body;

    // Simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or/and password!" });

    // Check password with passwordConfirm
    if (password !== passwordConfirm)
      return res.status(400).json({
        success: false,
        message: "Password and confirm password does not match!",
      });

    try {
      // Check existing username
      const user = await User.findOne({ username });
      if (user)
        return res
          .status(400)
          .json({ success: false, message: "Username has already taken!" });

      // newUser is valid
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({
        username,
        password: hashedPassword,
        displayName,
      });
      await newUser.save();

      // return accessToken

      const accessToken = jwt.sign(
        {
          userId: newUser._id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "Register successfully!!",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error!" });
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
    //   simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or/and password!" });
    try {
      const user = await User.findOne({ username });
      // Check existing user
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password!" });

      const passwordValidation = await argon2.verify(user.password, password);
      if (!passwordValidation)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password!" });

      // User login valid
      // return accessToken

      const accessToken = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "User logged in successfully!!!",
        accessToken,
        user: {
          _id: user._id,
          username: user.username,
          isAdmin: user.isAdmin,
          doneLessons: user.doneLessons,
          displayName: user.displayName,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error!" });
    }
  },
  checkUser: async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found" });

      return res.json({ success: true, user });
    } catch (error) {
      console.log("error", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error!" });
    }
  },
};

module.exports = authController;
