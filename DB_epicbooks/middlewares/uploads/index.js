const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudeAvatarAuthor = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "epicBooks_Avatar",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.originalname,
  },
});

const cloudAvatar = multer({ storage: cloudeAvatarAuthor });

const cloudeBookCover = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "epicBooks_Books",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.originalname,
  },
});

const cloudBook = multer({ storage: cloudeBookCover });



module.exports = {

  cloudAvatar,
  cloudBook
};
