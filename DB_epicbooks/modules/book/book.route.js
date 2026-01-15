const express = require("express");
const router = express.Router();
const bookController = require("./book.controller");

const {upload}= require ('../../middlewares/uploads/index.js')

;
router.get("/books", bookController.findAll);
router.get("/books/:id", bookController.findOne);
router.post("/books", bookController.create);
router.post('/books/upload', upload.single('cover'),bookController.uploadFile)
router.patch("/books/:id", bookController.modify);
router.delete("/books/:id", bookController.deleteOne);
router.patch("/books/:id/uploadCover",upload.single('cover'),bookController.uploadFileId)
module.exports = router;
