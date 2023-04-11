const AuthMaster = require("../Models/auth_master");

exports.getAuth_master = async (req, res) => {
  try {
    const  id  = req.params.id;
    if (id == undefined || id == "") {
      console.log(id);
      return res.status(400).json({ message: "Please Fill the Credentials" });
    }
    const auth_master = await AuthMaster.find({ auth_id: id });
    if (auth_master == null)
      throw new Error("No such auth_master exists with this id!");
    return res.status(200).json({
      data: auth_master,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.addAuth_master = async (req, res) => {
  try {
    const { auth_type } = req.body;
    if (auth_type == undefined || auth_type == "")
      return res.status(400).json({ message: "Please Fill the Credentials" });
    const auth_id =
      "auth_master_" +
      Date.now().toString() +
      Math.floor(Math.random() * 1000).toString();
    const auth_master = await AuthMaster.create({
      auth_id: auth_id,
      auth_type: auth_type,
    });
    return res.status(200).json({
      data: auth_master,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
