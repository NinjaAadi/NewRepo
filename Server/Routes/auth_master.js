const express = require("express");

const router = express.Router();

const {
  addAuth_master,
  getAuth_master,
} = require("../Controllers/auth_master");

router.post("/add", addAuth_master);
router.get("/get/:id", getAuth_master);

module.exports = router;
