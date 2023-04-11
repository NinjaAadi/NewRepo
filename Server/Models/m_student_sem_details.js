const mongoose = require("mongoose");

const mStudentSemDetailsSchema = new mongoose.Schema({
  m_student_sem_details_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  person_id: {
    type: String,
    required: true,
  },
  sem_details: [{ type: String }],
});

module.exports = mongoose.model(
  "m_student_sem_details",
  mStudentSemDetailsSchema
);
