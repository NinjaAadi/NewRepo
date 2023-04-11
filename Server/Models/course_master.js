const mongoose = require("mongoose");

const CourseMaster = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  course_details: {
    type: String,
  },
  dept_id: {
    id: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("course_master", CourseMaster);
