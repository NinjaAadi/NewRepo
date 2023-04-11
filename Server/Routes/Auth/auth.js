const express = require("express");

const router = express.Router();

const {
  studentLogin,
  facultyLogin,
  adminLogin,
} = require("../../Controllers/Auth/Login");

router.post("/student", studentLogin);
router.post("/faculty", facultyLogin);
router.post("/admin", adminLogin);

module.exports = router;