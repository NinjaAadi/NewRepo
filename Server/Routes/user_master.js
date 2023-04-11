const express = require("express");

const router = express.Router();

const { addUserMaster, getUserMaster } = require("../Controllers/user_master");

router.post("/add", addUserMaster);
router.get("/get/:id", getUserMaster);

module.exports = router;
