const Event = require("../../models/Faculty/Calender");

/*
    @desc Create an event
    @route POST /createEvent 
*/
exports.createEvent = async (req, res, next) => {
  try {
    console.log(req.body);
    const event = await Event.create(req.body);
    return res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({
      success: false,
      messege: "Server Error",
    });
  }
};
/*
   @desc Get all events
   @route getEvents
*/
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messege: "Server Error",
    });
  }
};
/*
   @desc Update an event
   @route PUT updateEvent/:id
*/
exports.updateEvent = async (req, res, next) => {
  try {
    const { title, start, end } = req.body;
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, start, end },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!event) {
      return res.status(404).json({
        success: false,
        messege: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messege: "Server Error",
    });
  }
};

/*
@desc Delete an event
@route DELETE deleteEvent/:id
*/
exports.deleteEvent = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        messege: "Event not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messege: "Server Error",
    });
  }
};
