const {commentModel}=require('../models/commentModel/commentModel')
const { checkauth } = require('../middlewares/authMiddleware');
const jwt =require('jsonwebtoken');



const getCommentController =async(req,res)=>{
  try{
  const comments = await commentModel.find({videoId:req.params.videoId}).populate("userId", " logoUrl channelName")
res.status(200).json({
  comments:comments
})



  }catch(error){
    console.log(error)
    res.status(400).json({
      msg:"error in get all comment"
    })
  }
}

module.exports={getCommentController}