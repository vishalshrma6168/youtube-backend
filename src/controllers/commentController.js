const {commentModel}=require('../models/commentModel/commentModel')
const { checkauth } = require('../middlewares/authMiddleware');
const jwt =require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


const commentController= async (req,res)=>{
  try{

 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
console.log( "verfiyuser",verifyUser)
 
const newComment =new commentModel({
  _id:new mongoose.Types.ObjectId,
  videoId:req.params.videoId,
  userId:verifyUser._id,
  commentText:req.body.commentText
})
  const comment =  await newComment.save()

res.status(200).json({
  comment:comment
})

  }
  catch(error){
    console.log(error)
    res.json({
      msg:"error in comment api"
    })
  }
}
module.exports={commentController}
