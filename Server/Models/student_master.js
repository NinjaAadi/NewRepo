const mongoose = require("mongoose");

const studentMaster = mongoose.Schema({
  student_id: {
    type: String,
    reqiured: true,
  },
  roll_no: {
    type: String,
    reqiured: true,
  },
  student_desc: {
    type: String,
    reqiured: true,
  },
});

module.exports = mongoose.model("student_master", studentMaster);
