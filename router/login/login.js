const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../model/userSchema");
mongoose.connect("mongodb://localhost:27017/dbs");

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (password) {
    const hashPwd = bcrypt.hashSync(password, 10);
    const obj = { username, password: hashPwd };

    User.insertOne(obj, (err, result) => {
      if (result) {
        res.send({
          status: "success",
          message: "注册成功",
        });
      } else {
        res.send({
          status: "fail",
          message: "注册失败",
        });
      }
    });
  } else {
    res.send({
      status: "fail",
      message: "参数错误",
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    User.findOne({ username }, (err, data) => {
      if (data) {
        const isPwdValid = bcrypt.compareSync(password, data.password);
        if (isPwdValid) {
          const token = jwt.sign({ ...data }, "hq", { expiresIn: 10 * 1 });
          res.send({
            status: "success",
            message: "登录成功",
            data: {
              username: data.username,
              token,
            },
          });
        } else {
          res.send({
            status: "fail",
            message: "用户名或密码错误",
          });
        }
      } else {
        res.send({
          status: "fail",
          message: "用户不存在",
        });
      }
    });
  } else {
    res.send({
      status: "fail",
      message: "参数错误",
    });
  }
});

module.exports = router;
