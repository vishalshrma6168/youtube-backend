const express =require('express')
const commentRoute =express.Router()
const { checkauth } = require('../middlewares/authMiddleware');


const { commentController } = require('../controllers/commentController');
const { getCommentController } = require('../controllers/getCommentController');
const { updateCommentController } = require('../controllers/updateCommentController');
const { deleteCommentController } = require('../controllers/deleteCommentController');


commentRoute.post('/new-comment/:videoId',checkauth, commentController)

// get all comment for any video

commentRoute.get('/:videoId',getCommentController)

// update comment
commentRoute.put('/:commentId',checkauth,updateCommentController)

// delete comment
commentRoute.delete('/:commentId',checkauth,deleteCommentController)


module.exports={commentRoute}