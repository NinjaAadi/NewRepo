const mongoose = require("mongoose");

const mStudentRegSchema = new mongoose.Schema({
  m_student_reg_id: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  sem_sub_details: {
    sem: [
      {
        sem_id: {
          type: String,
          required: true,
        },
        subject: [
          {
            sub_id: {
              type: String,
              required: true,
            },
            subtype_id: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("m_student_reg_details", mStudentRegSchema);
