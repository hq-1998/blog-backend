const express = require("express");
const loginRouter = require("./router/login/login");
const { jwtCheck } = require("./router/login/jwt");

const app = express();

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", loginRouter);
app.use(jwtCheck);

app.listen("3000", "localhost", () => {
  console.log("启动成功...");
});

module.exports = app;
