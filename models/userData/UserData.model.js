const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    goal: {
      prompt1: {
        type: String,
      },
      prompt2: {
        type: String,
      },
      goal: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
    },
    accommodations: {
      prompt1: {
        type: String,
      },
      prompt2: {
        type: String,
      },
      accommodations: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
    },
    present: {
      prompt1: {
        type: String,
      },
      prompt2: {
        type: String,
      },
      prompt3: {
        type: String,
      },
      present: {
        type: Boolean,
        enum: [true, false],
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", dataSchema);
module.exports = UserData;
