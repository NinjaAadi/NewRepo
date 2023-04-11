const express = require("express");

const router = express.Router();

const {
  addMStudentReg,
  getMStudentReg,
  getMStudentRegByStudentId,
} = require("../Controllers/m_student_reg");

router.post("/add", addMStudentReg);
router.get("/get/:id", getMStudentReg);
router.get("/getByStudentId/:student_id", getMStudentRegByStudentId);

module.exports = router;
