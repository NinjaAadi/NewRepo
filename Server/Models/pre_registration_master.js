const mongoose = require("mongoose");

const preRegistrationMaster = mongoose.Schema({
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
  is_active: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "pre_registration_master",
  preRegistrationMaster
);
