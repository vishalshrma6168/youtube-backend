const {commentModel}=require('../models/commentModel/commentModel')
const { checkauth } = require('../middlewares/authMiddleware');
const jwt =require('jsonwebtoken');

const deleteCommentController= async(req,res)=>{

try{
 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
console.log( "verfiyuser",verifyUser)
 const comment = await commentModel.findById(req.params.commentId)

console.log(comment)


if(comment.userId!=verifyUser._id){
  return res.status(400).json({
    msg:"you have not delete the comment"
  })
}else{
   await commentModel.findByIdAndDelete(req.params.commentId)
  res.status(200).json({
   deletedcomment:comment
  })
}



}catch(error){
  console.log(error)
  res.json({
    mag:"error in delete comment api"
  })
}
}

module.exports={deleteCommentController}

