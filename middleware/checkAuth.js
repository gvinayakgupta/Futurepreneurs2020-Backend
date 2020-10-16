const JWT = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(400).send("Access Denied!, No token Entered");
  try {
    const verified = JWT.verify(token, process.env.jwtSecret);
    req.team = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: "Auth failed, Invalid Token" });
  }
};
