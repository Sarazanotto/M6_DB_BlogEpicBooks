const mongoose = require("mongoose");

const Book = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
      default: 'https://picsum.photos/200/300'
    },
    readTime: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        required: false,
        default: "min",
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"author",
   
    },
  
    content: {
      type: String,
      required: true,
    },
    price:{
      type: Number,
      required:true,
      default:'0'
    }
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("book", Book, "books");
