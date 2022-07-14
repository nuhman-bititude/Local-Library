const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const token = req.header("auth-token");
    if (!token) {
      return res.status(401).send("Access Denied");
    }
    const verified = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log(verified);
    req.user = verified;
    console.log(req.user);
    // FIXME: Axios Crashing issue
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send("not valid");
  }
};
