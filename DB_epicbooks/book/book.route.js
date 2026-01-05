const express = require("express");
const router = express.Router();
const bookController = require("./book.controller");

router.get("/books", bookController.findAll);
router.get("/books/:id", bookController.findOne);
router.post("/books", bookController.create);
router.patch("/books/:id", bookController.modify);
router.delete("/books/:id", bookController.deleteOne);



module.exports = router;
