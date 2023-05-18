const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGO_URI;
const mongourl = "mongodb://localhost:27017/ASCEND_CAPITAL";
mongoose
  .connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("Connected to the MongoDB database");
  })
  .catch((err) => {
    console.log("Error connecting to the MongoDB database", err);
  });
