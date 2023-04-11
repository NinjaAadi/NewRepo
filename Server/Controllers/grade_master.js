const gradeMaster = require("../Models/grade_master");
const { getId } = require("../Helper/helper");
exports.addGradeMaster = async (req, res) => {
  try {
    const { grade_code, grade_pt, grade_desc } = req.body;
    const grade_id = getId("grade_master_");
    if (
      !grade_code ||
      !grade_pt ||
      !grade_desc ||
      grade_code === "" ||
      grade_pt === "" ||
      grade_desc === ""
    ) {
      return res.status(409).json({ message: "Please fill all fields" });
    }
    const grade = new gradeMaster({
      grade_id,
      grade_code,
      grade_pt,
      grade_desc,
    });

    await grade.save();

    res.status(201).json({ message: "Grade Added Successfully", data: grade });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
exports.getGradeMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id == "")
      return res.status(404).json({ message: "Grade not found" });

    const grade = await gradeMaster.findOne({ grade_id: id });
    if (!grade) return res.status(404).json({ message: "Grade not found" });
    res.status(200).json({ data: grade });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
