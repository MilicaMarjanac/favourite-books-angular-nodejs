import mongoose from "mongoose";

const Schema = mongoose.Schema;

let BookSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      required: true,
    },

    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    status: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    duration: { type: Number },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);
