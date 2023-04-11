const mongoose = require("mongoose");


const Faculty_timetable = mongoose.Schema({
  facultyId: {
    type: String,
    required: true,
    unique: true,
  },
  timetable: {
    data: [{ type: String }],
  },
});

module.exports = mongoose.model("Faculty_timetable", Faculty_timetable);
