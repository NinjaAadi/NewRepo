const { getId } = require("../Helper/helper");
const mStudentSemDetailsSchema = require("../Models/m_student_sem_details");

exports.addMStudentSemDetails = async (req, res) => {
  try {
    const { user_id, person_id, sem_details } = req.body;
    if (
      !user_id ||
      user_id === "" ||
      !person_id ||
      person_id === "" ||
      !sem_details ||
      sem_details === ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const m_student_sem_details_id = getId("m_student_sem_details_");
    const m_student_sem_details = new mStudentSemDetailsSchema({
      m_student_sem_details_id,
      user_id,
      person_id,
      sem_details,
    });
    await m_student_sem_details.save();
    return res.status(200).json({
      message: "m_student_sem_details created successfully!",
      data: m_student_sem_details,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMStudentSemDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const m_student_sem_details = await mStudentSemDetailsSchema.findOne({
      m_student_sem_details_id: id,
    });
    if (!m_student_sem_details) {
      return res.status(400).json({
        message: "No m_student_sem_details found",
      });
    }
    return res.status(200).json({
      message: "m_student_sem_details found successfully!",
      data: m_student_sem_details,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getNextSem = async (req, res) => {
  try {
    const person_id = req.params.id;
    if (!person_id || person_id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    console.log(person_id);
    //Find the next sem of student
    const sem_details = await mStudentSemDetailsSchema.findOne({
      person_id: person_id,
    });
    console.log(sem_details);
    let sem_id = "";
    let flag = false;
    for (var i = 0; i < sem_details.sem_details.length; i++) {
      const _sem = JSON.parse(sem_details.sem_details[i]);
      if (flag) {
        sem_id = _sem.sem_id;
      }
      if (_sem.curent_sem == "true") {
        flag = true;
      }
    }
    return res.status(200).json({
      message: "m_student_sem_details found successfully!",
      data: sem_id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};
