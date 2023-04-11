const mongoose = require("mongoose");

const AuthMaster = new mongoose.Schema({
  auth_id: {
    type: String,
    required: true,
    unique: true,
  },
  auth_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("auth_master", AuthMaster);
