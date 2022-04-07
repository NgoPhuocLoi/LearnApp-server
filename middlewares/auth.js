const jwt = require("jsonwebtoken");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "AccessToken not found!" });

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.log("error", error);
      res.status(403).json({ success: false, message: "Invalid Token" });
    }
  },
  verifyAdmin: async (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "AccessToken not found!" });

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (decoded.isAdmin) next();
      else
        return res
          .status(403)
          .json({ success: false, message: "Role is not Admin!" });
    } catch (error) {
      console.log("error", error);
      res.status(403).json({ success: false, message: "Invalid Token" });
    }
  },
};

module.exports = authMiddleware;
