const express = require("express");
const router = express.Router();
const bookController = require("./book.controller");
const validateBook = require("../../middlewares/validateBook.js")
const {upload}= require ('../../middlewares/uploads/index.js')

;
router.get("/books", bookController.findAll);
router.get("/books/:id", bookController.findOne);
router.post("/books"/*,[validateBook]*/, bookController.create);
router.post('/books-upload', upload.single('cover'),bookController.uploadFile)
router.patch("/books/:id", bookController.modify);
router.delete("/books/:id", bookController.deleteOne);

module.exports = router;
