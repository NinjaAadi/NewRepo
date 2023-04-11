const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const m_dept_prg_course_sem_subj_subj_typeSchema = new Schema({
  m_dept_prg_course_sem_subj_subj_type_id: {
    type: String,
    required: true,
  },
  sub_id: {
    type: String,
    required: true,
  },
  dept_id: {
    type: String,
    required: true,
  },
  prg_id: {
    type: String,
    required: true,
  },
  sem_id: {
    type: String,
    required: true,
  },
  course_id: {
    type: String,
    required: true,
  },
  faculty_id: {
    type: String,
    required: true,
  },
  subj_type_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "m_dept_prg_course_sem_subj_subj_type",
  m_dept_prg_course_sem_subj_subj_typeSchema
);
