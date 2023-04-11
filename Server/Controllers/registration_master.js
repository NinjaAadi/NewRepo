const { getId } = require("../Helper/helper");
const registrationMasterSchema = require("../Models/registration_master");

exports.addRegistrationMaster = async (req, res) => {
  try {
    const { pre_registration_id, acad_year, start_time, end_time, season } =
      req.body;
    if (
      !pre_registration_id ||
      pre_registration_id === "" ||
      !acad_year ||
      acad_year === "" ||
      !start_time ||
      start_time === "" ||
      !end_time ||
      end_time === "" ||
      !season ||
      season === ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const registration_id = getId("registration_master_");
    const registration_master = new registrationMasterSchema({
      registration_id,
      pre_registration_id,
      acad_year,
      start_time,
      end_time,
      season,
    });
    await registration_master.save();
    return res.status(200).json({
      message: "registration_master created successfully!",
      data: registration_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getRegistrationMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const registration = await registrationMasterSchema.findOne({
      registration_id: id,
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
