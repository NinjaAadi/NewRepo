const programMasterSchema = require("../Models/program_master");
const { getId } = require("../Helper/helper");

exports.getProgramMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const program_master = await programMasterSchema.findOne({ program_id: id });
    if (!program_master) {
      return res.status(400).json({
        message: "program_master not found",
      });
    }
    return res.status(200).json({
      message: "program_master found successfully!",
      data: program_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.addProgramMaster = async (req, res) => {
  try {
    const { prog_code, prog_details } = req.body;
    if (
      !prog_code ||
      prog_code === "" ||
      !prog_details ||
      prog_details === ""
    ) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const prog_id = getId("program_master_");
    const program_master = new programMasterSchema({
      prog_id,
      prog_code,
      prog_details,
    });
    await program_master.save();
    return res.status(200).json({
      message: "program_master created successfully!",
      data: program_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
