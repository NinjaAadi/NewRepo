const subtypeMasterSchema = require("../Models/subtype_master");
const { getId } = require("../Helper/helper");
exports.addSubtypeMaster = async (req, res) => {
  try {
    const { sub_type, subtype_code } = req.body;
    if (!sub_type || !subtype_code || sub_type === "" || subtype_code === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const subtype_id = getId("subtype_master_");
    const subtype_master = new subtypeMasterSchema({
      subtype_id,
      sub_type,
      subtype_code,
    });
    await subtype_master.save();
    return res.status(200).json({
      message: "Subtype Master Added Successfully",
      data: subtype_master,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSubtypeMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const subtype_master = await subtypeMasterSchema.find({ subtype_id: id });
    if (!subtype_master) {
      return res.status(404).json({
        message: "No Subtype Master Found",
      });
    }
    return res.status(200).json({
      message: "Subtype Master Found",
      data: subtype_master,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
