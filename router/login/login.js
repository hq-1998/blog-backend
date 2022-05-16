const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../model/userSchema");
const { jwtSign } = require("./jwt");
const { default: sendFail } = require("../../utils/sendFail");
mongoose.connect("mongodb://localhost:27017/dbs");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const hashPwd = bcrypt.hashSync(password, 10);
    const obj = { username, password: hashPwd };

    User.insertOne(obj, (err, result) => {
      if (result) {
        res.send({
          status: "success",
          message: "注册成功",
        });
      } else {
        sendFail(res, "注册失败");
      }
    });
  } else {
    sendFail(res, "参数错误");
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username }, (err, data) => {
      if (data) {
        const isPwdValid = bcrypt.compareSync(password, data.password);
        if (isPwdValid) {
          const token = jwtSign({ ...data });
          res.send({
            status: "success",
            message: "登录成功",
            data: {
              username: data.username,
              token,
            },
          });
        } else {
          sendFail(res, "用户名或密码错误");
        }
      } else {
        sendFail(res, "用户不存在");
      }
    });
  } else {
    sendFail(res, "参数错误");
  }
});

module.exports = router;
