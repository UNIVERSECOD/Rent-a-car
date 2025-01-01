import mongoose, { Types } from "mongoose";

const rentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Rent = mongoose.model("Rent", rentSchema);

export default Rent;
