const express = require("express");

const route = express.Router();

const {
  addMStudentAttendance,
  getMStudentAttendance,
  getMStudentAttendanceByStudentId,
} = require("../Controllers/m_student_attendance");

route.post("/add", addMStudentAttendance);
route.get("/get/:id", getMStudentAttendance);
route.get("/getByStudentId/:id", getMStudentAttendanceByStudentId);

module.exports = route;
