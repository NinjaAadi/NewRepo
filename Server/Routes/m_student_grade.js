const express = require("express");

const router = express.Router();

const {
  getMStudentGrade,
  addMStudentGrade,
  getMStudentGradeByStudentId,
} = require("../Controllers/m_student_grade");

router.get("/get/:id", getMStudentGrade);
router.post("/add", addMStudentGrade);
router.get("/getByStudentId/:id", getMStudentGradeByStudentId);

module.exports = router;
