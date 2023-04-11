const express = require("express");

const {
  addTimeTable,
  getTimeTable,
} = require("../../Controllers/faculty/faculty_timetable");

const router = express.Router();

router.route("/add").post(addTimeTable);
router.route("/get/:facultyId").get(getTimeTable);

module.exports = router;
