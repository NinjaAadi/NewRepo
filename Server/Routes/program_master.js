const express = require("express");

const router = express.Router();

const {
  addProgramMaster,
  getProgramMaster,
} = require("../Controllers/program_master");

router.post("/add", addProgramMaster);
router.get("/get/:id", getProgramMaster);

module.exports = router;
