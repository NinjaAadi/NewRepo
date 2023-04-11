const facultyMaster = require("../Models/faculty_master");
const { getId } = require("../Helper/helper");
exports.addFacultyMaster = async (req, res) => {
  try {
    const { roll_no, faculty_desc } = req.body;
    const faculty_id = getId("faculty_master_");
    if (!roll_no || !faculty_desc || roll_no === "") {
      return res.status(409).json({ message: "Please fill all fields" });
    }
    const faculty = new facultyMaster({
      faculty_id,
      roll_no,
      faculty_desc,
    });

    await faculty.save();

    res
      .status(201)
      .json({ message: "Faculty Added Successfully", data: faculty });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.getFacultyMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id == "")
      return res.status(404).json({ message: "Faculty not found" });
    const faculty = await facultyMaster.find({ faculty_id: id });

    res.status(200).json(faculty);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.getFacultyMasterByRollNo = async (req, res) => {
  try {
    const roll_no = req.params.id;
    if (!roll_no || roll_no == "")
      return res
        .status(404)
        .json({ message: "Please provide a valid roll number" });
    const faculty = await facultyMaster.findOne({ roll_no: roll_no });
    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }
    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
