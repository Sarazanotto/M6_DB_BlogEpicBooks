const express= require ('express')
const commentController= require('./comment.controller')

const router= express.Router()
router.get('/authors/:id/comments',commentController.findByAuthor)
router.get('/books/:id/comments',commentController.findByBook)
router.get('/books/:id/comments/:commentId', commentController.findOneIdBook)
router.post('/books/:id/comments', commentController.create)
//content, rate e author id

router.patch('/books/:id/comments/:commentId',commentController.update)
router.delete('/books/:id/comments/:commentId',commentController.deleted)



module.exports= router