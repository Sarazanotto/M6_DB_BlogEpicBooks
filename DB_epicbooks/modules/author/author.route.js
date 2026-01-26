const express = require("express");
const router = express.Router();
const authorController = require("./author.controller");
const {cloudAvatar}= require ('../../middlewares/uploads/index.js')
const auth= require ('../../middlewares/authentication/authUser.js')

router.get("/authors",auth, authorController.findAll);
router.get('/authors/:id',auth, authorController.findOne)
router.post('/authors/upload',cloudAvatar.single('avatar'),authorController.uploadFile)
router.post('/authors', authorController.create)
router.patch('/authors/:id/avatar',auth, cloudAvatar.single('avatar'),authorController.uploadFileId)
router.patch('/authors/:id',auth, authorController.modify)
router.delete('/authors/:id',auth, authorController.deleteUser)


module.exports = router;