const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Author = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: false,
      default: Date.now(),
    },
    avatar: {
      type: String,
      required: false,
      default: "https://picsum.photos/150",
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
//prima di salvare l'utente sul create
module.exports = mongoose.model("author", Author, "authors");
