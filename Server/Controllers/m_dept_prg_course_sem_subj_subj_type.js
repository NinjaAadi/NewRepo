const m_dept_prg_course_sem_subj_subj_typeSchema = require("../Models/m_dept_prg_course_sem_subj_subj_type");
const { getId } = require("../Helper/helper");
exports.addMDeptPrgCourseSemSubjSubjType = async (req, res) => {
  try {
    const {
      sub_id,
      dept_id,
      prg_id,
      sem_id,
      course_id,
      faculty_id,
      subj_type_id,
    } = req.body;
    if (
      !sub_id ||
      !dept_id ||
      !prg_id ||
      !sem_id ||
      !course_id ||
      !faculty_id ||
      !subj_type_id ||
      sub_id == "" ||
      dept_id == "" ||
      prg_id == "" ||
      sem_id == "" ||
      course_id == "" ||
      faculty_id == "" ||
      subj_type_id == ""
    ) {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const m_dept_prg_course_sem_subj_subj_type_id = getId(
      "m_dept_prg_course_sem_subj_subj_type_"
    );
    const deptPrgCourseSemSubjSubjType =
      await m_dept_prg_course_sem_subj_subj_typeSchema.create({
        m_dept_prg_course_sem_subj_subj_type_id,
        sub_id,
        dept_id,
        prg_id,
        sem_id,
        course_id,
        faculty_id,
        subj_type_id,
      });
    return res.status(200).json({
      message:
        "Department program course semester subject subject type added successfully!",
      data: deptPrgCourseSemSubjSubjType,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getMDeptPrgCourseSemSubjSubjType = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const deptPrgCourseSemSubjSubjType =
      await m_dept_prg_course_sem_subj_subj_typeSchema.find({
        m_dept_prg_course_sem_subj_subj_type_id: id,
      });
    if (!deptPrgCourseSemSubjSubjType) {
      return res.status(404).json({
        message:
          "Department program course semester subject subject type not found!",
      });
    }
    return res.status(200).json({
      message: "Department program course semester subject subject type found!",
      data: deptPrgCourseSemSubjSubjType,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getDataByFacultyId = async (req,res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const deptPrgCourseSemSubjSubjType =
      await m_dept_prg_course_sem_subj_subj_typeSchema.find({
        faculty_id: id,
      });
    if (!deptPrgCourseSemSubjSubjType) {
      return res.status(404).json({
        message:
          "Department program course semester subject subject type not found!",
      });
    }
    return res.status(200).json({
      message: "Department program course semester subject subject type found!",
      data: deptPrgCourseSemSubjSubjType,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
}