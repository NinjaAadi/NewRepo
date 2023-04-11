const express = require("express");

const router = express.Router();

const {
  addMSubjectBucket,
  getSubjectBucketById,
} = require("../Controllers/m_subject_bucket");

router.post("/add", addMSubjectBucket);
router.get("/get/:id", getSubjectBucketById);

module.exports = router;
