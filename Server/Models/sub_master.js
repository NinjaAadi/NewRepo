const mongoose = require("mongoose");

const subMaster = mongoose.Schema({
  sub_id: {
    type: String,
    required: true,
  },
  sub_code: {
    type: String,
    required: true,
  },
  sub_credit: {
    type: String,
    required: true,
  },
  sub_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("sub_master", subMaster);
