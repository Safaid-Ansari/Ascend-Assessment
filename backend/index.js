const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();
const DB = require("./config/connection");
const passport = require("passport");
const JwtStrategy = require("./config/passport.jwt.strategy");
// const userRoute = require("./routes/User");
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(passport.initialize());
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log("our server listening on port", port);
});
