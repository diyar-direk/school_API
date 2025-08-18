const jwt = require("jsonwebtoken");

module.exports = (...roles) => {
  return async (req, res, next) => {
    const headers =
      req.headers["authorization"] || req.headers["Authorization"];
    const token = headers?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "UnAuthorized" });
    try {
      const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!roles.includes(currentUser.role))
        return res.status(403).json({ message: "Access Denied" });
      req.currentUser = currentUser;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired", error });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
