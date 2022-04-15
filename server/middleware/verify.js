const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const payload = jwt.verify(token, process.env.Jwt_secret_key);
    req.user = { userid: payload.userid, username: payload.username };
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Unauthenticated user" });
  }
};

module.exports = verify;
