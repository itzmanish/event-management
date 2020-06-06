const express = require("express");
const BodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const hpp = require("hpp");
const path = require("path");

// read from .env file
require("dotenv").config();

require("./middlewares/mongoose");
const app = express();
const HOST = process.env.HOST || "127.0.0.1"
const PORT = 3001;

app.use(morgan("dev"));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
// i should use hpp for preventing dos attack on my express app
app.use(hpp());
// security is important so helmet is
app.use(helmet());
app.use(helmet.frameguard("SAMEORIGIN"));
app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(helmet.noSniff());

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(__dirname + "/uploads"));

// middleware for CORS
app.use((req, res, next) => {
  // Allow all origin for now.
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// All routes is initialized here
const HomeRoutes = require("./routes/home");
app.use("/", HomeRoutes);

app.listen(PORT, HOST, () => {
  console.log(`server is running on http://${HOST}:${PORT}`);
});
