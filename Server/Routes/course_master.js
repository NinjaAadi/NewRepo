const express = require("express");

const router = express.Router();

const {
  getCourseMaster,
  addCourseMaster,
} = require("../Controllers/course_master");

router.post("/add", addCourseMaster);
router.get("/get/:id", getCourseMaster);
module.exports = router;
