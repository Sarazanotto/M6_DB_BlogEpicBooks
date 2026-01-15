const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const internalStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueRandomName = `${Date.now()}-${Math.floor(
      Math.random() * 579990
    )}`;
    const fileExtention = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueRandomName}.${fileExtention}`);
  },
});

const upload = multer({ storage: internalStorage });

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "epicBooks_Avatar",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.originalname,
  },
});

const cloudUpload = multer({ storage: cloudStorage });

module.exports = {
  upload,
  cloudUpload,
};
