const { getId } = require("../Helper/helper");
const orgMaster = require("../Models/org_master");

exports.addOrgMaster = async (req, res) => {
  try {
    const { org_name } = req.body;
    if (!org_name || org_name === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const org_id = getId("org_master_");
    const org_master = new orgMaster({
      org_id,
      org_name,
    });
    await org_master.save();
    return res.status(200).json({
      message: "org_master created successfully!",
      data: org_master,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
exports.getOrgMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const org = await orgMaster.find({ org_id: id });
    if (!org) {
      return res.status(400).json({
        message: "No org_master found",
      });
    }
    return res.status(200).json({
      message: "org_master found successfully!",
      data: org,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
