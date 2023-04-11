const express = require("express");

const router = express.Router();

const {
  addMDeptPrgCourseSemSubjSubjType,
  getMDeptPrgCourseSemSubjSubjType,
  getDataByFacultyId,
} = require("../Controllers/m_dept_prg_course_sem_subj_subj_type");

router.post("/add", addMDeptPrgCourseSemSubjSubjType);
router.get("/get/:id", getMDeptPrgCourseSemSubjSubjType);
router.get("/getByFacultyId/:id", getDataByFacultyId);
module.exports = router;
