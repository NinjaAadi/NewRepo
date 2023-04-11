const express = require("express");

const router = express.Router();

const { addSiteMaster, getSiteMaster } = require("../Controllers/site_master");

router.post("/add", addSiteMaster);
router.get("/get/:id", getSiteMaster);

module.exports = router;
