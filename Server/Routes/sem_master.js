const express = require("express");

const router = express.Router();

const {
  addSemMaster,
  getSemMaster,
  getSemMasterBySemId,
} = require("../Controllers/sem_master");

router.post("/add", addSemMaster);
router.get("/get/:id", getSemMaster);
router.get("/getBySemId/:sem_id", getSemMasterBySemId);

module.exports = router;
