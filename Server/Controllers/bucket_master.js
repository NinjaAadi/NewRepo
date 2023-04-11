const BucketMaster = require("../Models/bucket_master");

exports.getBucket_master = async (req, res) => {
  try {
    const id = req.params.id;
    if (id == undefined || id == "") {
      console.log(id);
      return res.status(400).json({ message: "Please Fill the Credentials" });
    }
    const bucket_master = await BucketMaster.find({ bucket_id: id });
    if (bucket_master == null)
      throw new Error("No such bucket_master exists with this id!");
    return res.status(200).json({
      data: bucket_master,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
exports.addBucket_master = async (req, res) => {
  try {
    const { bucket_name } = req.body;
    if (bucket_name == undefined || bucket_name == "")
      return res.status(400).json({ message: "Please Fill the Credentials" });
    const bucket_id =
      "bucket_master_" +
      Date.now().toString() +
      Math.floor(Math.random() * 1000).toString();
    const bucket_master = await BucketMaster.create({
      bucket_id: bucket_id,
      bucket_name: bucket_name,
    });
    return res.status(200).json({
      data: bucket_master,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
