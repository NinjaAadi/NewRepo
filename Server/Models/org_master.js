const mongoose = require("mongoose");

const orgMaster = mongoose.Schema({
  org_id: {
    type: String,
    required: true,
  },
  org_name: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("org_master", orgMaster);
