const express = require("express");

const router = express.Router();

const {
  addMStudentPreReg,
  getMStudentPreReg,
  getAllSubjectForPreReg,
} = require("../Controllers/m_student_pre_reg");

router.post("/add", addMStudentPreReg);
router.get("/get/:id", getMStudentPreReg);
router.get("/getSubject/:id", getAllSubjectForPreReg);

module.exports = router;
