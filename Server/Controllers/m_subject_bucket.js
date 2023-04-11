const mSubjectBucketSchema = require("../Models/m_subject_bucket");
const { getId } = require("../Helper/helper");
exports.getSubjectBucketById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    let res = mSubjectBucketSchema.findOne({ m_sub_bucket_id: id });
    if (res) {
      return res.status(200).json({
        message: "Subject Bucket Fetched Successfully",
        data: res,
      });
    }
    res = mSubjectBucketSchema.findOne({ bucket_id: id });
    if (res) {
      return res.status(200).json({
        message: "Subject Bucket Fetched Successfully",
        data: res,
      });
    }
    res = mSubjectBucketSchema.findOne({ sub_id: id });
    if (res) {
      return res.status(200).json({
        message: "Subject Bucket Fetched Successfully",
        data: res,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.addMSubjectBucket = async (req, res) => {
  try {
    const { sub_id, bucket_id } = req.body;
    if (!sub_id || !bucket_id || sub_id == "" || bucket_id == "") {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const m_sub_bucket_id = getId("m_sub_bucket_id_");
    const mSubjectBucket = new mSubjectBucketSchema({
      m_sub_bucket_id,
      sub_id,
      bucket_id,
    });
    await mSubjectBucket.save();
    res.status(200).json({
      message: "Subject Bucket Added Successfully",
      data: mSubjectBucket,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
