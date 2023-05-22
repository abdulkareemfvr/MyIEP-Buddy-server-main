const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccommodationsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    prompt1: {
      type: String,
      required: true,
    },
    prompt2: {
      type: String,
      required: true,
    },
    accommodations: {
      type: Boolean,
      required: true,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Accommodations = mongoose.model("Accommodations", AccommodationsSchema);

module.exports = Accommodations;
