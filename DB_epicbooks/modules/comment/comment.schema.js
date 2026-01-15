const mongoose = require("mongoose");

const comment = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("comment", comment, "comments");
