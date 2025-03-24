
const express=require('express');
const { vedioController } = require('../controllers/vedioController');
const { checkauth } = require('../middlewares/authMiddleware');
const { vedioUpdateController } = require('../controllers/videoUpdateController');
const { vedioDeleteController } = require('../controllers/vedioDeleteController');
const { videoLikeController } = require('../controllers/videoLikeConroller');
const { videoDislikeController } = require('../controllers/videoDislikeController');
const { viewsController } = require('../controllers/viewsController');
const vedioRoute =express.Router();

vedioRoute.post('/uploadvideo', checkauth,vedioController);

vedioRoute.put("/updatevideo/:videoId",checkauth,vedioUpdateController)

vedioRoute.delete('/deletevideo/:videoId',checkauth,vedioDeleteController)

vedioRoute.put('/like/:videoId',checkauth,videoLikeController)

vedioRoute.put('/dislike/:videoId',checkauth,videoDislikeController)

vedioRoute.put('/views/:videoId',viewsController)

module.exports ={vedioRoute}