const siteMaster = require("../Models/site_master");
const { getId } = require("../Helper/helper");

exports.addSiteMaster = async (req, res) => {
  try {
    const { site_code, site_address, site_map, org_id } = req.body;
    if (
      !site_code ||
      !site_address ||
      !site_map ||
      !org_id ||
      site_code === "" ||
      site_address === "" ||
      site_map === "" ||
      org_id === ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const site_id = getId("site_master_");
    const site_master = new siteMaster({
      site_id,
      site_code,
      site_address,
      site_map,
      org_id,
    });
    await site_master.save();
    return res.status(200).json({
      message: "site_master created successfully!",
      data: site_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getSiteMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const site_master = await siteMaster.find({ site_id: id });
    if (!site_master) {
      return res.status(404).json({
        message: "No Site Master Found",
      });
    }
    return res.status(200).json({
      message: "Site Master Found",
      data: site_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
