
const express = require("express");

const router = express.Router();

const {
  addBucket_master,
  getBucket_master,
} = require("../Controllers/bucket_master");

router.post("/add", addBucket_master);
router.get("/get/:id", getBucket_master);

module.exports = router;
