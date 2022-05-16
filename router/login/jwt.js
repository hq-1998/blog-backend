const jwt = require("jsonwebtoken");
const jwtKey = "hq";

// token一小时过期
const jwtSign = (data) => {
  const token = jwt.sign(data, jwtKey, { expiresIn: 10 * 1 });
  return token;
};

const jwtCheck = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, jwtKey, (err, data) => {
    if (err) {
      res.send({
        code: "-1",
        message: "无效的token",
      });
    } else {
      req.jwtInfo = data;
      next();
    }
  });
};

module.exports = {
  jwtSign,
  jwtCheck,
};
