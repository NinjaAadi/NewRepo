const { getId } = require("../Helper/helper");
const mStudentReg = require("../Models/m_student_reg");

exports.addMStudentReg = async (req, res) => {
  try {
    const { student_id, sem_sub_details } = req.body;
    if (!student_id) {
      return res.status(400).json({
        message: "Please provide a valid student id!",
      });
    }

    const studentReg = await mStudentReg.create({
      m_student_reg_id: getId("m_student_reg_"),
      student_id,
      sem_sub_details,
    });
    return res.status(200).json({
      message: "Student Registration added successfully!",
      data: studentReg,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getMStudentRegByStudentId = async (req, res) => {
  try {
    const student_id = req.params.student_id;
    if (!student_id) {
      return res.status(400).json({
        message: "Please provide a valid student id!",
      });
    }
    const resp = await mStudentReg.find({ student_id: student_id });
    if (!res) {
      return res.status(404).json({
        message: "Student Registration not found!",
      });
    }
    return res.status(200).json({
      message: "Student Registration found!",
      data: resp,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getMStudentReg = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentReg = await mStudentReg.find({ m_student_reg_id: id });
    if (!studentReg) {
      return res.status(404).json({
        message: "Student Registration not found!",
      });
    }
    return res.status(200).json({
      message: "Student Registration found!",
      data: studentReg,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
