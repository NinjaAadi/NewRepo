const mongoose = require("mongoose");

const programMasterSchema = mongoose.Schema({
  prog_id: {
    type: String,
    required: true,
  },
  prog_code: {
    type: String,
    required: true,
  },
  prog_details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("program_master", programMasterSchema);
