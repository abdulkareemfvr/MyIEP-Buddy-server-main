const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PresentSchema = new Schema(
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
    prompt3: {
      type: String,
      required: true,
    },
    present: {
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

const Present = mongoose.model("Present", PresentSchema);

module.exports = Present;
