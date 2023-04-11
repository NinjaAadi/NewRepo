const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const m_subject_bucketSchema = new Schema({
  m_sub_bucket_id: {
    type: String,
    required: true,
  },
  sub_id: {
    type: String,
    required: true,
  },
  bucket_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("m_subject_bucket", m_subject_bucketSchema);
