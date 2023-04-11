const express = require("express");

const router = express.Router();

const { addSubMaster, getSubMaster } = require("../Controllers/sub_master");

router.post("/add", addSubMaster);
router.get("/get/:id", getSubMaster);

module.exports = router;
