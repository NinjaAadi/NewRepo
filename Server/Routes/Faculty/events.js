const express = require("express");

const {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require("../../Controllers/Faculty/eventCalender");

const router = express.Router();
router.post("/createEvent", createEvent);
router.get("/getEvents", getEvents);
router.delete("/deleteEvent/:id", deleteEvent);
router.put("/updateEvent/:id", updateEvent);

module.exports = router;
