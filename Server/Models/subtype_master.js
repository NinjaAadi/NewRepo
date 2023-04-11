const mongoose = require("mongoose");

const subTypeMaster = mongoose.Schema({
  subtype_id: {
    type: String,
    required: true,
  },
  sub_type: {
    type: String,
    required: true,
  },
  subtype_code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("subtype_master", subTypeMaster);
