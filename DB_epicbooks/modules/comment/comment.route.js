const express= require ('express')
const commentController= require('./comment.controller')

const router= express.Router()
const auth= require ('../../middlewares/authentication/authUser.js')

router.get('/authors/:id/comments',auth, commentController.findByAuthor)
router.get('/books/:id/comments',auth, commentController.findByBook)
router.get('/books/:id/comments/:commentId', auth, commentController.findOneIdBook)
router.post('/books/:id/comments', auth, commentController.create)
//content, rate e author id

router.patch('/books/:id/comments/:commentId',auth, commentController.update)
router.delete('/books/:id/comments/:commentId',auth, commentController.deleted)



module.exports= router