const { getId } = require("../Helper/helper");
const mStudentPreReg = require("../Models/m_student_pre_reg");
const mStudentDeptPrgCourse = require("../Models/m_student_dept_prg_course");
const mDeptPrgCourseSemSubSubType = require("../Models/m_dept_prg_course_sem_subj_subj_type");
const mSubject = require("../Models/sub_master");
const mSubjectType = require("../Models/subtype_master");
const studentMasterSchema = require("../Models/student_master");
const m_dept_dept_detailsSchema = require("../Models/m_dept_dept_details");
const mStudentSemDetailsSchema = require("../Models/m_student_sem_details");
const mSubjectBucket = require("../Models/m_subject_bucket");
const mBucketMaster = require("../Models/bucket_master");
const sub_master = require("../Models/sub_master");
exports.addMStudentPreReg = async (req, res) => {
  try {
    const { student_id, person_id, sem_sub_details } = req.body;
    if (!student_id || !person_id || student_id == "" || person_id == "") {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }

    const studentReg = await mStudentPreReg.create({
      m_student_pre_reg_id: getId("m_student_pre_reg_"),
      student_id,
      person_id,
      sem_sub_details,
    });
    return res.status(200).json({
      message: "Student pre registration added successfully!",
      data: studentReg,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getAllSubjectForPreReg = async (req, res) => {
  try {
    const student_id = req.params.id;
    if (!student_id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentProfile = await studentMasterSchema.findOne({
      student_id: student_id,
    });
    const student_rollNo = studentProfile.roll_no;

    const isRegistered = true         ;
    if (!isRegistered) {
      //Fetch the course and department of the student
      const student = await mStudentDeptPrgCourse.findOne({
        student_id: student_id,
      });
      if (!student)
        return res.status(404).json({
          message: "Student not found!",
        });

      const { dept_id, prog_id, course_id } = student;
      //Fetch the current semester
      const d_details = await m_dept_dept_detailsSchema.findOne({
        dept_id,
        "dept_details.prg_id": prog_id,
        "dept_details.course_id": course_id,
      });
      console.log(d_details.dept_details);
      const total_subjects = d_details.dept_details[0].no_of_subjects;

      //Find the next sem of student
      const sem_details = await mStudentSemDetailsSchema.findOne({
        person_id: student_rollNo,
      });
      let sem_id = "";
      let flag = false;
      for (var i = 0; i < sem_details.sem_details.length; i++) {
        const _sem = JSON.parse(sem_details.sem_details[i]);
        if (flag) {
          sem_id = _sem.sem_id;
        }
        if (_sem.current_sem == "true") {
          flag = true;
        }
      }

      const subjects = await mDeptPrgCourseSemSubSubType.find({});
      let resData = [];
      const elective_subjects = [];
      const total_sub_offered = [];
      for (let i = 0; i < subjects.length; i++) {
        const sub_id = subjects[i].sub_id;
        const subtype_id = subjects[i].subj_type_id;
        const subject = await mSubject.findOne({ sub_id: sub_id });
        const subtype = await mSubjectType.findOne({ subtype_id: subtype_id });

        resData.push({
          subject: subject,
          subtype: subtype,
        });
        const subj_desc = JSON.parse(subject.sub_desc);
        total_sub_offered.push({
          sub_code: subject.sub_code,
          sub_credit: subject.sub_credit,
          sub_id: subject.sub_id,
          sub_name: subj_desc.dispName,
          sub_type: subtype.sub_type,
          subtype_code: subtype.subtype_code,
          subtype_id: subtype.subtype_id,
        });
        if (subtype.sub_type == "Elective") {
          const bucket = await mSubjectBucket.findOne({
            sub_id: subject.sub_id,
          });
          const bucketData = await mBucketMaster.findOne({
            bucket_id: bucket.bucket_id,
          });
          const subj_desc = JSON.parse(subject.sub_desc);
          elective_subjects.push({
            bucket_id: bucket.bucket_id,
            bucket_name: bucketData.bucket_name,
            sub_code: subject.sub_code,
            sub_credit: subject.sub_credit,
            sub_id: subject.sub_id,
            sub_name: subj_desc.dispName,
            sub_type: subtype.sub_type,
            subtype_code: subtype.subtype_code,
            subtype_id: subtype.subtype_id,
          });
        }
      }

      return res.status(200).json({
        message: "Subjects found!",
        data: {
          elective_subjects: elective_subjects,
          total_sub_offered: total_sub_offered,
          pre_resgistered: isRegistered ? "yes" : "no",
          sub_number_opt: parseInt(total_subjects),
        },
      });
    } else {
      const sem_details = await mStudentSemDetailsSchema.findOne({
        person_id: student_rollNo,
      });
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
      const preReg = await mStudentPreReg.findOne({
        student_id: student_id,
      });
      const resData = [];
      //The 0 needs to be changed to the semester index
      for (var i = 0; i < preReg.sem_sub_details.sem[0].subject.length; i++) {
        const subject = await sub_master.findOne({
          sub_id: preReg.sem_sub_details.sem[0].subject[i].sub_id,
        });
        const subDesc = JSON.parse(subject.sub_desc);
        const subName = subDesc.dispName;
        const sub_code = subDesc.sub_code;
        preReg.sem_sub_details.sem[0].subject[i]["sub_name"] = subName;
        preReg.sem_sub_details.sem[0].subject[i]["sub_code"] = sub_code;
        const nObj = {
          sub_code: subject.sub_code,
          sub_id: subject.sub_id,
          sub_name: subName,
        };
        resData.push(nObj);
      }
      for (var i = 0; i < preReg.sem_sub_details.sem.length; i++) {
        if (preReg.sem_sub_details.sem[i].sem_id == sem_id) {
          return res.status(200).json({
            message: "Subjects found!",
            data: {
              selected_subject: resData,
              elective_subjects: [],
              total_sub_offered: [],
              sub_number_opt: 0,
              pre_registered: "yes",
            },
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getMStudentPreReg = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const studentReg = await mStudentPreReg.find({ m_student_pre_reg_id: id });
    if (!studentReg) {
      return res.status(404).json({
        message: "Student pre registration not found!",
      });
    }
    return res.status(200).json({
      message: "Student pre registration found!",
      data: studentReg,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
