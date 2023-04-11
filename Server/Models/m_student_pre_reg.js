const mongoose = require("mongoose");

const mStudentPreReg = new mongoose.Schema({
  m_student_pre_reg_id: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  person_id: {
    type: String,
    required: true,
  },
  sem_sub_details: {
    sem: [
      {
        sem_id: {
          type: String,
        },
        subject: [
          {
            sub_id: {
              type: String,
            },
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("m_student_pre_reg_details", mStudentPreReg);
