
const express=require('express');
const { userController } = require('../controllers/userController');
const { userloginController } = require('../controllers/userController');
const { checkauth } = require('../middlewares/authMiddleware');
const {  subscribeChannelController } = require('../controllers/subscribeChannelController');
const { unsubscribeChannelController } = require('../controllers/unsubscribeChannelConroller');

const userRoute =express.Router();
// signup
userRoute.post("/signup",userController)

// login
userRoute.post("/login",userloginController)

// subsrcibe  api
userRoute.put('/subscribe/:userBId',checkauth,subscribeChannelController)

// unsubscribe api
userRoute.put('/unsubscribe/:userBId',checkauth,unsubscribeChannelController)

module.exports={userRoute}