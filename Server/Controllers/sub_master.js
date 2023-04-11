const subMaster = require("../Models/sub_master");
const { getId } = require("../Helper/helper");
exports.addSubMaster = async (req, res) => {
  try {
    const { sub_code, sub_credit, sub_desc } = req.body;
    if (
      !sub_code ||
      !sub_credit ||
      !sub_desc ||
      sub_code === "" ||
      sub_credit === "" ||
      sub_desc === ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const sub_id = getId("sub_master_");
    const sub_master = new subMaster({
      sub_id,
      sub_code,
      sub_credit,
      sub_desc,
    });
    await sub_master.save();
    return res.status(200).json({
      message: "sub_master created successfully!",
      data: sub_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSubMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const sub_master = await subMaster.findOne({ sub_id: id });
    if (!sub_master) {
      return res.status(404).json({
        message: "No Sub Master Found",
      });
    }
    return res.status(200).json({
      message: "Sub Master Found",
      data: sub_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
