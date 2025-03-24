
const jwt =require('jsonwebtoken')
const { videoModel } = require('../models/vedioModel/vedioModel')


const videoLikeController = async (req,res)=>{
  try{

 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)

console.log(verifyUser)
    
    const video =   await videoModel.findById(req.params.videoId)
    console.log("video",video)

    if(video.likedby.includes(verifyUser._id)){
  return res.status(500).json({
    msg:"allready liked "
  })
   }
   if(video.dislikeby.includes(verifyUser._id)){
    video.dislikes -=1;
    video.dislikeby=video.dislikeby.filter(userId=>userId.toString()!=verifyUser._id)

   }
   
   
     // like krne ka code
  video.likes+=1;
  video.likedby.push(verifyUser._id)
  await video.save()
  res.status(200).json({
    msg:"now you like video"
  })



  }catch(error){
    console.log(error)
    res.json({
      mag:"error in like route"
    })
  }
 }

 module.exports={videoLikeController}