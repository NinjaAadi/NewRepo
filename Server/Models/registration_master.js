const mongoose = require("mongoose");

const registrationMaster = mongoose.Schema({
  registration_id: {
    type: String,
    required: true,
  },
  pre_registration_id: {
    type: String,
    required: true,
  },
  acad_year: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("registration_master", registrationMaster);
