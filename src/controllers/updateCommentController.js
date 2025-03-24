const {commentModel}=require('../models/commentModel/commentModel')
const { checkauth } = require('../middlewares/authMiddleware');
const jwt =require('jsonwebtoken');

const updateCommentController= async(req,res)=>{

try{
 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
console.log( "verfiyuser",verifyUser)
 const comment = await commentModel.findById(req.params.commentId)

console.log(comment)
if(comment.userId!=verifyUser._id){
  return res.status(400).json({
    msg:"you have not edit the comment"
  })
}else{
 comment.commentText= req.body.commentText
  const updatedcomment =await comment.save()
  res.status(200).json({
    comment:updatedcomment
  })
}



}catch(error){
  console.log(error)
  res.json({
    mag:"error in upadte comment api"
  })
}
}

module.exports={updateCommentController}