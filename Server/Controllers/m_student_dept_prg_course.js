const studentDeptPrgCourseSchema = require("../Models/m_student_dept_prg_course");
const { getId } = require("../Helper/helper");
exports.addMStudentDeptPrgCourse = async (req, res) => {
  try {
    const { student_id, person_id, dept_id, prog_id, course_id } = req.body;
    if (
      !student_id ||
      !person_id ||
      !dept_id ||
      !prog_id ||
      !course_id ||
      student_id == "" ||
      person_id == "" ||
      dept_id == "" ||
      prog_id == "" ||
      course_id == ""
    ) {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const m_student_dept_prg_course_id = getId("m_student_dept_prg_course_");
    const studentDeptPrgCourse = await studentDeptPrgCourseSchema.create({
      m_student_dept_prg_course_id,
      student_id,
      person_id,
      dept_id,
      prog_id,
      course_id,
    });
    return res.status(200).json({
      message: "Student department program course added successfully!",
      data: studentDeptPrgCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getMStudentDeptPrgCourseByProgDeptCourse = async (req, res) => {
  try {
    const { dept_id, prog_id, course_id } = req.params;
    if (
      !dept_id ||
      !prog_id ||
      !course_id ||
      dept_id == "" ||
      prog_id == "" ||
      course_id == ""
    ) {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const studentDeptPrgCourse = await studentDeptPrgCourseSchema.find({
      dept_id,
      prog_id,
      course_id,
    });
    return res.status(200).json({
      success: true,
      data: studentDeptPrgCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ success: false, message: "Server Error" });
  }
};
exports.getMStudentDeptPrgCourseByStudentId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentDeptPrgCourse = await studentDeptPrgCourseSchema.findOne({
      student_id: id,
    });
    if (!studentDeptPrgCourse) {
      return res.status(404).json({
        message: "Student department program course not found!",
      });
    }
    return res.status(200).json({
      message: "Student department program course found!",
      data: studentDeptPrgCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getMStudentDeptPrgCourse = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentDeptPrgCourse = await studentDeptPrgCourseSchema.findOne({
      m_student_dept_prg_course_id: id,
    });
    if (!studentDeptPrgCourse) {
      return res.status(404).json({
        message: "Student department program course not found!",
      });
    }
    return res.status(200).json({
      message: "Student department program course found!",
      data: studentDeptPrgCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
