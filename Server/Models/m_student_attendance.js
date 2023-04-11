const mongoose = require("mongoose");

const mStudentAttendance = new mongoose.Schema({
  m_student_attendance_id: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  attendance_details: {
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
            attendance_detail: [
              {
                is_present: {
                  type: String,
                  required: true,
                },
                attendance_date: {
                  type: String,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
});

module.exports = mongoose.model("student_attendance", mStudentAttendance);
