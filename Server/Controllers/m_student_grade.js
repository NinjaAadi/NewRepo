const { getId } = require("../Helper/helper");

const studentGradeSchema = require("../Models/m_student_grade");

exports.getMStudentGrade = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentGrade = await studentGradeSchema.findOne({
      m_student_grade_id: id,
    });
    if (!studentGrade) {
      return res.status(404).json({
        message: "Student grade not found!",
      });
    }
    return res.status(200).json({
      message: "Student grade found!",
      data: studentGrade,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getMStudentGradeByStudentId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentGrade = await studentGradeSchema.findOne({
      student_id: id,
    });
    if (!studentGrade) {
      return res.status(404).json({
        message: "Student grade not found!",
      });
    }
    return res.status(200).json({
      message: "Student grade found!",
      data: studentGrade,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addMStudentGrade = async (req, res) => {
  try {
    const { student_id, grade_details } = req.body;
    if (!student_id || !grade_details || student_id == "") {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const m_student_grade_id = getId("m_student_grade_");
    const studentGrade = await studentGradeSchema.create({
      m_student_grade_id,
      student_id,
      grade_details,
    });
    return res.status(200).json({
      message: "Student grade added successfully!",
      data: studentGrade,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
