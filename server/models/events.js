const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const eventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["offline", "online"],
      default: "offline",
      required: true,
    },
    eventStatus: {
      type: String,
      enum: {
        values: ["draft", "approved", "declined"],
        message: "only 'draft', 'approve' and 'decline' is valid.",
      },
      default: "draft",
    },
    eventPicture: {
      type: String,
    },
    socialLinks: {
      type: [String],
    },
    eventDetails: {
      type: String,
    },
  },
  { strict: true }
);

eventSchema.plugin(timestamps);
eventSchema.methods.toJSON = function () {
  return {
    _id: this._id,
    event_title: this.eventTitle,
    event_type: this.eventType,
    event_status: this.eventStatus,
    event_picture: this.eventPicture,
    social_links: this.socialLinks,
    event_details: this.eventDetails,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};
let event = mongoose.model("Events", eventSchema);

module.exports = event;
