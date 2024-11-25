import mongoose from "mongoose";
const { Schema } = mongoose;

const subcategorySchema = new Schema({
  title: { type: String, required: true },
  description: String,
  thumbnail: { type: String, required: true },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
});

export const SubCategoryModal = mongoose.models.Subcategories || mongoose.model(
  "Subcategories",
  subcategorySchema
);