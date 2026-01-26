const express = require("express");
const router = express.Router();
const bookController = require("./book.controller");
const { cloudBook } = require("../../middlewares/uploads/index.js");
const auth= require ('../../middlewares/authentication/authUser.js')

router.get("/books",auth, bookController.findAll);
router.get("/books/:id",auth, bookController.findOne);
router.post(
  "/books/upload",auth,
  cloudBook.single("cover"),
  bookController.uploadFile,
);
router.post("/books",auth, bookController.create);
router.patch(
  "/books/:id/uploadCover",auth,
  cloudBook.single("cover"),
  bookController.uploadFileId,
);
router.patch("/books/:id",auth, bookController.modify);

router.delete("/books/:id",auth, bookController.deleteOne);

module.exports = router;
