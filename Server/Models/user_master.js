const mongoose = require("mongoose");

const userMaster = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  person_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  auth_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  group_id: {
    type: String,
    required: true,
  },
  site_id: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    required: true,
  },
  is_password_changed: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user_master", userMaster);
