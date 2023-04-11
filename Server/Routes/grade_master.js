const express = require("express");

const router = express.Router();

const {
  addGradeMaster,
  getGradeMaster,
} = require("../Controllers/grade_master");

router.post("/add", addGradeMaster);
router.get("/get/:id", getGradeMaster);

module.exports = router;
