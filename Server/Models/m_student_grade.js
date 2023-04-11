const mongoose = require("mongoose");

const studentGrade = new mongoose.Schema({
  m_student_grade_id: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  grade_details: {
    sem: [
      {
        sem_id: {
          type: String,
        },
        gradeDetails: [
          {
            sub_id: {
              type: String,
            },
            grade_id: {
              type: String,
            },
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("student_grade", studentGrade);
