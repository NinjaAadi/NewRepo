const mongoose = require("mongoose");

const facultyMaster = mongoose.Schema({
  faculty_id: {
    type: String,
    required: true,
  },
  roll_no: {
    type: String,
    required: true,
  },
  faculty_desc: {
    type: String,
  },
});

module.exports = mongoose.model("faculty_master", facultyMaster);
