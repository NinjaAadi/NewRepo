const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const midSemGradeSchema = new Schema({
  student_id: {
    type: String,
    required: true,
  },
  sub_id: {
    type: String,
    required: true,
  },
  subtype_id: {
    type: String,
    required: true,
  },
  quiz1: {
    type: String,
    required: true,
  },
  quiz2: {
    type: String,
    required: true,
  },
  sess1: {
    type: String,
    required: true,
  },
  sess2: {
    type: String,
    required: true,
  },
  sem: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("mid_sem_grade", midSemGradeSchema);
