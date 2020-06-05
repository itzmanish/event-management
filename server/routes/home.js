const express = require("express");
const _ = require("lodash");
const { ObjectID } = require("mongodb");
const router = express.Router();
const Events = require("./../models/events");
const multer = require("multer");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("./../lib/auth/passport-auth");
require("./../lib/auth/passport-jwt");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
});
// multer configuration end

// All GET request start

router.get("/", (req, res) => {
  res.send("Express server is running!");
});

router.get("/events", (req, res) => {
  Events.find()
    .then((doc) => res.json(doc))
    .catch((e) => console.log(e));
});

// All GET request end

// All POST request start
router.post(
  "/create-event",
  upload.single("eventPicture"),
  async (req, res) => {
    let body = _.pick(req.body, [
      "eventTitle",
      "eventType",
      "eventPicture",
      "socialLinks",
      "eventDetails",
    ]);

    try {
      const doc = await Events.findOne({ eventTitle: body.event_title });
      if (doc) {
        return res.send("This event already exist");
      }
      if (req.file && req.file.path) {
        body.eventPicture = req.file.path;
      }
      let event = new Events(body);

      const events = await event.save();
      res.status(201).json(events);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.post("/signup", (req, res) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err || info) {
      return res.status(409).json(err || info);
    }
    res.status(201).json(user);
  })(req, res);
});

router.post("/login", async (req, res, next) => {
  passport.authenticate(
    "login",
    { session: false },
    async (err, user, info) => {
      try {
        if (err || !user) {
          res.status(404).send(info);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) {
            return res.status(401).send({ error: "Unable to login" });
          }
          // storing email is good enough for now
          const payload = {
            email: user.email,
            expires: Date.now() + parseInt(18000),
          };
          /** generate a signed json web token and return it in the response */
          const token = jwt.sign(JSON.stringify(payload), process.env.secret);

          //Send back the token to the user
          return res.json({ token });
        });
      } catch (error) {
        console.log(error);

        next(error);
      }
    }
  )(req, res, next);
});

router.put(
  "/event/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let body = _.pick(req.body, ["eventStatus"]);
    try {
      if (!ObjectID.isValid(req.params.id)) {
        return res.status(404).send("Invalid id of event");
      }

      const event = await Events.findById(req.params.id);

      if (!event) {
        return res.status(404).send("Event doesn't exist");
      }
      const eventData = await Events.findByIdAndUpdate(
        req.params.id,
        { $set: body },
        { new: true }
      );
      if (!eventData) {
        return res.status(404).send("Event cannot updated");
      }
      return res.json(eventData);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

module.exports = router;
