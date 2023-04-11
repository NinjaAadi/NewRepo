const CourseMaster = require("../Models/course_master");
const { getId } = require("../Helper/helper");

exports.getCourseMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (id == undefined || id == "") {
      return res.status(400).json({ message: "Please Fill the Credentials" });
    }
    const courseMaster = await CourseMaster.findOne({ course_id: id });
    if (courseMaster == null)
      throw new Error("No such courseMaster exists with this id!");
    return res.status(200).json({
      data: courseMaster,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.addCourseMaster = async (req, res) => {
  try {
    const course_id = getId("course_master");
    let { course_code, course_details, dept_id } = req.body;

    if (
      course_code == undefined ||
      course_code == "" ||
      course_details == undefined ||
      course_details == "" ||
      dept_id == undefined ||
      dept_id.id == ""
    ) {
      return res.status(400).json({ message: "Please Fill the Credentials" });
    }
    console.log(dept_id);
    const courseMaster = new CourseMaster({
      course_id,
      course_code,
      course_details,
      dept_id,
    });
    await courseMaster.save();
    return res
      .status(201)
      .json({ message: "Course Master Added", data: courseMaster });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
