import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  title: String,
  description: String,
  startTime: String,
  endTime: String,
  thumbnail : String,
  startDate: String,
  endDate: String,
  location: {
    lat: Number,
    long: Number,
  },
  address: String,
  createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
  category: { type: mongoose.Types.ObjectId, ref: "Categories" },
  subcategory: { type: mongoose.Types.ObjectId, ref: "Subcategories" },
  going: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
});

export const EventModal =
  mongoose.models.Events || mongoose.model("Events", eventSchema);