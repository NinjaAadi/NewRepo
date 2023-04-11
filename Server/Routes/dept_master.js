const express = require("express");

const router = express.Router();

const {
  addDept_master,
  getDept_master,
} = require("../Controllers/dept_master");

router.post("/add", addDept_master);
router.get("/get/:id", getDept_master);

module.exports = router;
