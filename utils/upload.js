const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const moment = require("moment");
const File = require("../model/fileSchema");

// 单文件上传
router.post("/upload", async (req, res) => {
  try {
    const file = req.file;
    const fileNameArr = file.originalname.split(".");
    const suffix = fileNameArr[fileNameArr.length - 1];
    const currentDate = moment(new Date()).format("YYYY_MM_DD.HH_mm_ss");
    const file_new_name = `${currentDate}_${fileNameArr[0]}.${suffix}`;

    fs.renameSync(
      path.join(__dirname, `../public/uploadFile/${file.filename}`),
      path.join(__dirname, `../public/uploadFile/${file_new_name}`)
    );

    const doc = await File.findOne({
      original_name: file.originalname,
      file_type: suffix,
      file_size: file.size,
    });

    if (doc) {
      res.status(200).json({
        status: "success",
        data: {
          id: doc._id,
          file_name: doc.original_name,
          file_path: `http://127.0.0.1:3000/uploadFile/${file_new_name}`,
        },
      });
    } else {
      const response = {
        file_name: file.filename,
        file_new_name: file_new_name,
        file_type: suffix,
        file_path: file.path,
        file_size: file.size,
        original_name: file.originalname,
      };

      await File.create(response);
      res.status(200).json({
        status: "success",
        data: response,
      });
    }
  } catch (error) {
    res.send({
      status: "fail",
      message: error,
    });
  }
});

module.exports = router;
