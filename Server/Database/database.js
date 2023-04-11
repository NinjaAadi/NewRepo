const mongoose = require("mongoose");

//Connect to the database using the mongoDb url
const connectDb = async () => {
  try {
    console.log(process.env.MONGO_URL);
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.log(error);
    console.log("Error in connecting to the database");
  }
};
module.exports = connectDb;