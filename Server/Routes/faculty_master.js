const express = require("express");

const router = express.Router();
const {
  addFacultyMaster,
  getFacultyMaster,
  getFacultyMasterByRollNo,
} = require("../Controllers/faculty_master");
router.post("/add", addFacultyMaster);
router.get("/get/:id", getFacultyMaster);
router.get("/getByRollNo/:id", getFacultyMasterByRollNo);
module.exports = router;
