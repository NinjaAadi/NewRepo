const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const m_dept_dept_detailsSchema = new Schema({
  m_dept_dept_details_id: {
    type: String,
    required: true,
  },
  dept_id: {
    type: String,
    required: true,
  },
  dept_details: [
    {
      sem_id: {
        type: String,
        required: true,
      },
      prog_id: {
        type: String,
        required: true,
      },
      course_id: {
        type: String,
        required: true,
      },
      no_of_subjects: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model(
  "m_dept_dept_details",
  m_dept_dept_detailsSchema
);
