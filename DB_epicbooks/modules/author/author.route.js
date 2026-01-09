const express = require("express");

const router = express.Router();

const authorController = require("./author.controller");


router.get("/authors", authorController.findAll);
router.get('/authors/:id', authorController.findOne)
router.post('/authors', authorController.create)
router.patch('/authors/:id', authorController.modify)
router.delete('/authors/:id', authorController.deleteUser)

module.exports = router;
