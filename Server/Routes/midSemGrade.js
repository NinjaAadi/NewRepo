const express = require("express");
const router = express.Router();

const {
  addMidSemGrade,
  getMidSemGradeByStudentId,
} = require("../Controllers/midSemGrade");

router.post("/add", addMidSemGrade);
router.get("/getMidSemGradeByStudentId/:student_id", getMidSemGradeByStudentId);

module.exports = router;
