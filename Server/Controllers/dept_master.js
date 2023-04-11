const DeptMaster = require("../Models/dept_master.js");
const { getId } = require("../Helper/helper.js");
exports.getDept_master = async (req, res) => {
  try {
    const id = req.params.id;
    if (id == undefined || id == "") {
      return res.status(400).json({ message: "Please Fill the Credentials" });
    }
    const dept_master = await DeptMaster.findOne({ dept_id: id });
    if (dept_master == null)
      throw new Error("No such dept_master exists with this id!");
    return res.status(200).json({
      data: dept_master,
    });
  } catch (error) {}
};
exports.addDept_master = async (req, res) => {
  try {
    const { dept_code, dept_details } = req.body;
    if (
      !dept_code ||
      !dept_details ||
      dept_code === "" ||
      dept_details === ""
    ) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const dept_id = getId("dept_master_");
    const dept_master = await DeptMaster.create({
      dept_id: dept_id,
      dept_code: dept_code,
      dept_details: dept_details,
    });
    return res.status(200).json({
      data: dept_master,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
