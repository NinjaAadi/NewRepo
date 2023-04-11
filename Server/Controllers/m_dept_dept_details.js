const m_dept_dept_details = require("../Models/m_dept_dept_details");
const { getId } = require("../Helper/helper");
exports.addMDeptDeptDetails = async (req, res) => {
  try {
    const { dept_id, dept_details } = req.body;
    if (
      !dept_id ||
      !dept_details ||
      dept_id == undefined ||
      dept_details == null
    ) {
      return res.status(400).json({
        message: "Please provide credentials!",
      });
    }
    const m_dept_dept_details_id = getId("m_dept_dept_details_");
    const deptDetails = await m_dept_dept_details.create({
      m_dept_dept_details_id,
      dept_id,
      dept_details,
    });
    return res.status(200).json({
      message: "Department details added successfully!",
      data: deptDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.getMDeptDeptDetails = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Please provide a valid id!",
      });
    }
    const deptDetails = await m_dept_dept_details.findOne({
      m_dept_dept_details_id: id,
    });
    if (!deptDetails) {
      return res.status(404).json({
        message: "Department details not found!",
      });
    }
    return res.status(200).json({
      message: "Department details found!",
      data: deptDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
