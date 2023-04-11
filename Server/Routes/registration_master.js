const express = require("express");

const router = express.Router();

const {
  addRegistrationMaster,
  getRegistrationMaster,
} = require("../Controllers/registration_master");

router.post("/add", addRegistrationMaster);
router.get("/get/:id", getRegistrationMaster);

module.exports = router;
