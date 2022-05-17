const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  file_name: String,
  file_new_name: String,
  file_type: String,
  file_path: String,
  file_size: String,
  original_name: String
});

const File = mongoose.model("file", schema);

module.exports = File;
