const path = require("path");
const env = require("dotenv").config({
  path: path.join(__dirname, "config.env"),
});
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

//Import Routes
const auth_master = require("./Routes/auth_master");
const bucket_master = require("./Routes/bucket_master");
const dept_master = require("./Routes/dept_master");
const course_master = require("./Routes/course_master");
const faculty_master = require("./Routes/faculty_master");
const grade_master = require("./Routes/grade_master");
const user_master = require("./Routes/user_master");
const subtype_master = require("./Routes/subtype_master");
const sub_master = require("./Routes/sub_master");
const student_master = require("./Routes/student_master");
const site_master = require("./Routes/site_master");
const sem_master = require("./Routes/sem_master");
const registration_master = require("./Routes/registration_master");
const pre_registration_master = require("./Routes/pre_registration_master");
const org_master = require("./Routes/org_master");
const m_student_sem_details = require("./Routes/m_student_sem_details");
const m_student_reg = require("./Routes/m_student_reg");
const m_student_pre_reg = require("./Routes/m_student_pre_reg");
const m_dept_dept_details = require("./Routes/m_dept_dept_details");
const m_dept_prg_course_sem_subj_subj_type = require("./Routes/m_dept_prg_course_sem_subj_subj_type");
const m_student_attendance = require("./Routes/m_student_attendance");
const m_student_dept_prg_course = require("./Routes/m_student_dept_prg_course");
const m_student_grade = require("./Routes/m_student_grade");
const program_master = require("./Routes/program_master");
const m_subject_bucket = require("./Routes/m_subject_bucket");
const auth = require("./Routes/Auth/auth");
const events = require("./routes/Faculty/events");
const faculty_timeTable = require("./Routes/Faculty/faculty_timeTable");
const midSemGrade = require("./Routes/midSemGrade");
//Connect to the database
const connectDb = require("./Database/database");
connectDb();

app.use(express.json({ limit: 100000000 }));

//Route Middlewares
app.use("/auth_master", auth_master);
app.use("/bucket_master", bucket_master);
app.use("/dept_master", dept_master);
app.use("/course_master", course_master);
app.use("/faculty_master", faculty_master);
app.use("/grade_master", grade_master);
app.use("/user_master", user_master);
app.use("/subtype_master", subtype_master);
app.use("/sub_master", sub_master);
app.use("/student_master", student_master);
app.use("/site_master", site_master);
app.use("/sem_master", sem_master);
app.use("/registration_master", registration_master);
app.use("/pre_registration_master", pre_registration_master);
app.use("/org_master", org_master);
app.use("/m_student_sem_details", m_student_sem_details);
app.use("/m_student_reg", m_student_reg);
app.use("/m_student_pre_reg", m_student_pre_reg);
app.use("/m_dept_dept_details", m_dept_dept_details);
app.use(
  "/m_dept_prg_course_sem_subj_subj_type",
  m_dept_prg_course_sem_subj_subj_type
);

app.use("/m_student_attendance", m_student_attendance);
app.use("/m_student_dept_prg_course", m_student_dept_prg_course);
app.use("/m_student_grade", m_student_grade);
app.use("/program_master", program_master);
app.use("/m_subject_bucket", m_subject_bucket);
app.use("/login", auth);
app.use("/events", events);
app.use("/faculty_timeTable", faculty_timeTable);
app.use("/midSemGrade", midSemGrade);
app.listen(process.env.PORT, () => {
  console.log("App running in port " + process.env.PORT);
});
