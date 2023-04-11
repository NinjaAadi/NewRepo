const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DeptMaster = new Schema({
  dept_id: {
    type: String,
    required: true,
    unique: true,
  },
  dept_code: {
    type: String,
    required: true,
    unique: true,
  },
  dept_details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dept_master", DeptMaster);
