const express = require("express");

const router = express.Router();

const {
  addStudentMaster,
  getStudentMaster,
  getStudentMasterByRollNo,
  updateStudentMaster,
} = require("../Controllers/student_master");

router.post("/add", addStudentMaster);
router.get("/get/:id", getStudentMaster);
router.get("/getByRollNo/:roll_no", getStudentMasterByRollNo);
router.put("/update/:id", updateStudentMaster);

module.exports = router;
