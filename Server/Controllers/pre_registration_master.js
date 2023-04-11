const { getId } = require("../Helper/helper");
const preRegistrationMaster = require("../Models/pre_registration_master");

exports.addPreRegistrationMaster = async (req, res) => {
  try {
    const { acad_year, start_time, end_time, season, is_active } = req.body;
    if (
      !acad_year ||
      acad_year === "" ||
      !start_time ||
      start_time === "" ||
      !end_time ||
      end_time === "" ||
      !season ||
      season === "" ||
      !is_active ||
      is_active === ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const pre_registration_id = getId("pre_registration_master_");
    const pre_registration_master = new preRegistrationMaster({
      pre_registration_id,
      acad_year,
      start_time,
      end_time,
      season,
      is_active,
    });
    await pre_registration_master.save();
    return res.status(200).json({
      message: "pre_registration_master created successfully!",
      data: pre_registration_master,
    });
  } catch (error) {
    d;
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getPreRegistrationMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const registration = await preRegistrationMaster.findOne({
      pre_registration_id: id,
    });
    if (!registration) {
      return res.status(400).json({
        message: "Registration not found",
      });
    }
    return res.status(200).json({
      message: "Registration found successfully!",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
