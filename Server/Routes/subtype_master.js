const express = require("express");

const router = express.Router();

const {
  addSubtypeMaster,
  getSubtypeMaster,
} = require("../Controllers/subtype_master");

router.post("/add", addSubtypeMaster);
router.get("/get/:id", getSubtypeMaster);

module.exports = router;
