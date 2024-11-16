import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    event: { type: mongoose.Types.ObjectId, ref: "Events" },
    comment: String,
  },
  { timestamps: true }
);

export const CommentsModal =
  mongoose.models.Comments || mongoose.model("Comments", commentSchema);