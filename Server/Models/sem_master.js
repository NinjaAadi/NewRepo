const mongoose = require("mongoose");

const semMaster = mongoose.Schema({
  sem_id: {
    type: String,
    required: true,
  },
  sem_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("sem_master", semMaster);
