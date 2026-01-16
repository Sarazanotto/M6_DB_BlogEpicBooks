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
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    date: {
      type: Date,
      required: false,
      default: Date.now,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://picsum.photos/150",
    }
  },
  {
    timestamps: true,
    strict: true,
  }
);
//REGISTRAZIONE, il presave mi cifra la pssw prima di salvarla,
//isModified se non è cambiata fai hash
//salt genera sale unico
//this password mi hasha la pssw usando il salt
Author.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

//VALIDAZIONE PASSWORD
//prendi pssw che digito nel login
//this.pssw confronto la pssw con l'hash
//bcrypt.compare restituisce l'hash e verifica se corrisponde
//true se corrisponde false se no
Author.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password or email are failed");
  }
};

module.exports = mongoose.model("author", Author, "authors");
