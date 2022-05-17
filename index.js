const express = require("express");
const loginRouter = require("./router/login/login");
const uploadRouter = require("./utils/upload");
const { jwtCheck } = require("./router/login/jwt");
const multer = require("multer");
const upload = multer({ dest: "./public/uploadFile" });

const app = express();

app.use(upload.single("file"));
app.use(upload.array("file", 9));

app.all("*", (_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use("/", loginRouter);
app.use("/file", uploadRouter);
app.use(jwtCheck);

app.listen("3000", "localhost", () => {
  console.log("启动成功...");
});

module.exports = app;
