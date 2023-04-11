const userMasterSchema = require("../../Models/user_master");
const { generateToken } = require("../../Helper/jwt");
exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
     console.log(email, password);
    if (!email || !password || email == "" || password == "")
      return res.status(400).json({
        message: "Please enter all the fields",
      });

    const student = await userMasterSchema.findOne({
      email: email,
      person_id: password,
      user_type: "1",
    });
    console.log(student);
    if (!student) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const token = generateToken(student.person_id);
    return res.status(200).json({
      message: "Login Successful",
      token: token,
      user: student,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.facultyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email == "" || password == "")
      return res.status(400).json({
        message: "Please enter all the fields",
      });
    const faculty = await userMasterSchema.findOne({
      email: email,
      person_id: password,
      user_type: "3",
    });
    if (!faculty) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const token = generateToken(faculty.person_id);

    return res.status(200).json({
      message: "Login Successful",
      token: token,
      user: faculty,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password || email == "" || password == "")
      return res.status(400).json({
        message: "Please enter all the fields",
      });
    const admin = await userMasterSchema.findOne({
      email: email,
      person_id: password,
      user_type: "2",
    });
    if (!admin) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const token = generateToken(admin.person_id);
    return res.status(200).json({
      message: "Login Successful",
      token: token,
      user: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
