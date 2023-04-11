const mongoose = require("mongoose");

const studentDeptPrgCourse = new mongoose.Schema({
  m_student_dept_prg_course_id: {
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
  dept_id: {
    type: String,
    required: true,
  },
  prog_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "student_dept_prg_course",
  studentDeptPrgCourse
);
