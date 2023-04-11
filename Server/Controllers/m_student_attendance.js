const mStudentAttendance = require("../Models/m_student_attendance");
const { getId } = require("../Helper/helper");
exports.addMStudentAttendance = async (req, res) => {
  try {
    const { student_id, attendance_details } = req.body;
    if (
      !student_id ||
      !attendance_details ||
      student_id == undefined ||
      attendance_details == null
    ) {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const m_student_attendance_id = getId("m_student_attendance_");
    const studentAttendance = await mStudentAttendance.create({
      m_student_attendance_id,
      student_id,
      attendance_details,
    });
    return res.status(200).json({
      message: "Student attendance added successfully!",
      data: studentAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getMStudentAttendanceByStudentId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentAttendance = await mStudentAttendance.findOne({
      student_id: id,
    });
    if (!studentAttendance) {
      return res.status(404).json({
        message: "Student attendance not found!",
      });
    }
    return res.status(200).json({
      message: "Student attendance found!",
      data: studentAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getMStudentAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentAttendance = await mStudentAttendance.find({
      m_student_attendance_id: id,
    });
    if (!studentAttendance) {
      return res.status(404).json({
        message: "Student attendance not found!",
      });
    }
    return res.status(200).json({
      message: "Student attendance found!",
      data: studentAttendance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
