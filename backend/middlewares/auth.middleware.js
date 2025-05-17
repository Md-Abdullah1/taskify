const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const checkAuthorization = async (req, res, next) => {
  // console.log("yes checking authorization");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password"); // attach user to request
      console.log(req.user,"checking in author", token);
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, not a valid token" });
  }
};

module.exports = checkAuthorization;
