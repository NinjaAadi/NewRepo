const mongoose = require("mongoose");

const siteMaster = mongoose.Schema({
  site_id: {
    type: String,
    required: true,
  },
  site_code: {
    type: String,
    required: true,
  },
  site_address: {
    type: String,
    required: true,
  },
  site_map: {
    type: String,
    required: true,
  },
  org_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("site_master", siteMaster);
