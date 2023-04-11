const studentMaster = require("../Models/student_master");
const { getId } = require("../Helper/helper");
exports.addStudentMaster = async (req, res) => {
  try {
    const { roll_no, student_desc } = req.body;
    if (!roll_no || !student_desc || roll_no === "" || student_desc === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const student_id = getId("student_master_");
    const student_master = new studentMaster({
      student_id,
      roll_no,
      student_desc,
    });
    await student_master.save();
    return res.status(200).json({
      message: "student_master created successfully!",
      data: student_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.updateStudentMaster = async (req, res) => {
  try {
    const student_id = req.params.id;
    const { student_desc } = req.body;
    if (
      !student_id ||
      !student_desc ||
      student_desc === "" ||
      student_id == ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const student_master = await studentMaster.findOne({
      student_id: student_id,
    });
    if (!student_master) {
      return res.status(404).json({
        message: "No Student Master Found",
      });
    }
    student_master.student_desc = student_desc;
    await student_master.save();
    return res.status(200).json({
      message: "Student Master Updated Successfully",
      data: student_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStudentMasterByRollNo = async (req, res) => {
  try {
    const roll_no = req.params.roll_no;
    if (!roll_no || roll_no === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const student_master = await studentMaster.find({ roll_no: roll_no });
    if (!student_master) {
      return res.status(404).json({
        message: "No Student Master Found",
      });
    }
    return res.status(200).json({
      message: "Student Master Found",
      data: student_master,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
exports.getStudentMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const student_master = await studentMaster.find({ student_id: id });
    if (!student_master) {
      return res.status(404).json({
        message: "No Student Master Found",
      });
    }
    return res.status(200).json({
      message: "Student Master Found",
      data: student_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
