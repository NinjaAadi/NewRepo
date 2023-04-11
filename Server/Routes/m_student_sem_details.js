const express = require("express");

const router = express.Router();

const {
  addMStudentSemDetails,
  getMStudentSemDetails,
  getNextSem,
} = require("../Controllers/m_student_sem_details");

router.post("/add", addMStudentSemDetails);
router.get("/get/:id", getMStudentSemDetails);
router.get("/next_sem/:id", getNextSem);

module.exports = router;
