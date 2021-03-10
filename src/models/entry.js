const mongoose = require("mongoose");
const { Schema } = mongoose;

const EntryLogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: String,
    comments: [String],
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    image: String,
    latitude: {
      type: Number,
      min: -90,
      max: 90,
      required: true,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
      required: true,
    },
  },
  { timestamps: true} 
);

module.exports = mongoose.model("EntryLog", EntryLogSchema);
