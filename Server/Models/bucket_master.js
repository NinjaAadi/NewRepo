const mongoose = require("mongoose");

const BucketMaster = new mongoose.Schema({
  bucket_id: {
    type: String,
    required: true,
    unique: true,
  },
  bucket_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("bucket_master", BucketMaster);
