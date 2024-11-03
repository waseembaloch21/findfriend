import mongoose from 'mongoose';
const { Schema } = mongoose;

const eventSchema = new Schema({
    title: String,
    description: String,
    startTime: String,
    endTime: String,
    startDate: String,
    endDate: String,
    location: {
      lat: Number,
      long: Number,
    },
    address: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: "Users" },
    going: [{ type: mongoose.Types.ObjectId, ref: "Users" }],
  });

export const EventModal = mongoose.model('Events', eventSchema);