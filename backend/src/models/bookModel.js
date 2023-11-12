import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    hashtags: {
        type: String,
        required: false,
    },
    likes: {
        type: String,
        required: false,
    },
    coverImage: {
        type: String,
        required: false,
    },
    publishYear: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Books',bookSchema)

export default Book; 