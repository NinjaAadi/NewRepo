const midSemGradeSchema = require("../Models/mid_sem_grade");

exports.addMidSemGrade = async (req, res) => {
  try {
    const { student_id, sub_id, subtype_id, quiz1, quiz2, sess1, sess2, sem } =
      req.body;
    if (
      !student_id ||
      !sub_id ||
      !subtype_id ||
      !quiz1 ||
      !quiz2 ||
      !sess1 ||
      !sess2 ||
      !sem ||
      student_id == "" ||
      sub_id == "" ||
      subtype_id == "" ||
      quiz1 == "" ||
      quiz2 == "" ||
      sess1 == "" ||
      sess2 == "" ||
      sem == ""
    ) {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const midSemGrade = await midSemGradeSchema.create({
      student_id,
      sub_id,
      subtype_id,
      quiz1,
      quiz2,
      sess1,
      sess2,
      sem,
    });
    return res.status(200).json({
      message: "Mid semester grade added successfully!",
      data: midSemGrade,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getMidSemGradeByStudentId = async (req, res) => {
  try {
    const { student_id } = req.params;
    if (!student_id || student_id == "") {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const midSemGrade = await midSemGradeSchema.findOne({
      student_id,
    });
    return res.status(200).json({
      message: "Mid semester grade fetched successfully!",
      data: midSemGrade,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
