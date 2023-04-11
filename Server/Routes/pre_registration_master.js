const express = require("express");

const router = express.Router();

const {
  addPreRegistrationMaster,
  getPreRegistrationMaster,
} = require("../Controllers/pre_registration_master");

router.post("/add", addPreRegistrationMaster);
router.get("/get/:id", getPreRegistrationMaster);

module.exports = router;
