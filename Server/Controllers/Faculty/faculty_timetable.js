const facultyTimetableSchema = require("../../Models/Faculty/faculty_timetable");

/*
    @route   GET /api/faculty_timetable/get/:facultyId
    @desc    Get a faculty timetable
*/
exports.getTimeTable = async (req, res) => {
  try {
    const data = await facultyTimetableSchema.find({
      facultyId: req.params.facultyId,
    });
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/*
    @route   POST /api/faculty_timetable/add
    @desc    Add a faculty timetable
*/
exports.addTimeTable = async (req, res) => {
  try {
    const data = req.body.data;
    console.log(data);
    /*
        TODO: Validate the faculty id and timetable string
    */
    const facultyId = req.body.facultyId;
    if (facultyId == undefined || facultyId == "" || facultyId == null)
      throw new Error("Faculty id not found");
    if (data == undefined || data == "" || data == null)
      return res.status(400).json({ message: "No data found" });

    //Create the timetable
    facultyTimetableSchema.create({ facultyId, timetable: { data: data } });

    return res
      .status(200)
      .json({ message: "Faculty timetable added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
