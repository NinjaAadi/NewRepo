const mongoose = require("mongoose");

const gradeMaster = mongoose.Schema({
  grade_id: {
    type: String,
    required: true,
  },
  grade_code: {
    type: String,
    required: true,
  },
  grade_pt: {
    type: String,
    required: true,
  },
  grade_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("grade_master", gradeMaster);
