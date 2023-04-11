const semMaster = require("../Models/sem_master");
const { getId } = require("../Helper/helper");

exports.addSemMaster = async (req, res) => {
  try {
    const { sem_desc } = req.body;
    if (!sem_desc || sem_desc === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const sem_id = getId("sem_master_");
    const sem_master = new semMaster({
      sem_id,
      sem_desc,
    });
    await sem_master.save();
    return res.status(200).json({
      message: "sem_master created successfully!",
      data: sem_master,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getSemMasterBySemId = async (req, res) => {
  try {
    const sem_id = req.params.sem_id;
    if (!sem_id || sem_id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const data = await semMaster.findOne({ sem_id: sem_id });
    if (!data) {
      return res.status(404).json({
        message: "No Semester Master Found",
      });
    }
    return res.status(200).json({
      message: "Semester Master Found",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSemMaster = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    const sem = await semMaster.findOne({ sem_id: id });
    if (!sem) {
      return res.status(400).json({
        message: "Semester not found",
      });
    }
    return res.status(200).json({
      message: "Semester found successfully!",
      data: sem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
