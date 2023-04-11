const express = require("express");

const router = express.Router();

const {
  addMStudentDeptPrgCourse,
  getMStudentDeptPrgCourse,
  getMStudentDeptPrgCourseByStudentId,
  getMStudentDeptPrgCourseByProgDeptCourse,
} = require("../Controllers/m_student_dept_prg_course");

router.post("/add", addMStudentDeptPrgCourse);
router.get("/get/:id", getMStudentDeptPrgCourse);
router.get("/getByStudentId/:id", getMStudentDeptPrgCourseByStudentId);
router.get(
  "/getByProgDeptCourse/:dept_id/:prog_id/:course_id",
  getMStudentDeptPrgCourseByProgDeptCourse
);

module.exports = router;
