const express = require("express");

const router = express.Router();

const {
  addMDeptDeptDetails,
  getMDeptDeptDetails,
} = require("../Controllers/m_dept_dept_details");

router.post("/add", addMDeptDeptDetails);
router.get("/get/:id", getMDeptDeptDetails);

module.exports = router;
