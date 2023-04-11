const userMasterSchema = require("../Models/user_master");
const { getId } = require("../Helper/helper");
exports.addUserMaster = async (req, res) => {
  try {
    const {
      person_id,
      email,
      contact_no,
      auth_id,
      status,
      group_id,
      site_id,
      user_type,
      is_password_changed,
    } = req.body;
    if (
      !person_id ||
      !email ||
      !contact_no ||
      !auth_id ||
      !status ||
      !group_id ||
      !site_id ||
      !user_type ||
      !is_password_changed ||
      person_id == "" ||
      email == "" ||
      contact_no == "" ||
      auth_id == "" ||
      status == "" ||
      group_id == "" ||
      site_id == "" ||
      user_type == "" ||
      is_password_changed == ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const user_id = getId("user_master_");
    const user_master = new userMasterSchema({
      user_id,
      person_id,
      email,
      contact_no,
      auth_id,
      status,
      group_id,
      site_id,
      user_type,
      is_password_changed,
    });
    await user_master.save();
    res.status(200).json({
      message: "User Master Added Successfully",
      data: user_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getUserMaster = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!user_id || user_id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const user_master = await userMasterSchema.find({ user_id: user_id });
    if (!user_master || user_master.length === 0) {
      return res.status(400).json({
        message: "User Master Not Found",
      });
    }

    res.status(200).json({
      message: "User Master Fetched Successfully",
      data: user_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
