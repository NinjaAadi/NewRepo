const express = require("express");

const router = express.Router();

const { addOrgMaster, getOrgMaster } = require("../Controllers/org_master");

router.post("/add", addOrgMaster);
router.get("/get/:id", getOrgMaster);

module.exports = router;
