
const jwt =require('jsonwebtoken')
const { videoModel } = require('../models/vedioModel/vedioModel')


const videoDislikeController = async (req,res)=>{
  try{

 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)

console.log(verifyUser)
    
    const video =  await videoModel.findById(req.params.videoId)
    console.log("video",video)

    if(video.dislikeby.includes(verifyUser._id)){
  return res.status(500).json({
    msg:"allready disliked "
  })
   }

    if(video.likedby.includes(verifyUser._id)){
    video.likes -=1;
    video.likedby=video.likedby.filter(userId=>userId.toString()!=verifyUser._id)
   }
   
   
     // dislike 
  video.dislikes+=1;
  video.dislikeby.push(verifyUser._id)
  await video.save()
  res.status(200).json({
    msg:"now you  dislikeby video"
  })



  }catch(error){
    console.log(error)
    res.json({
      mag:"error in dislike route"
    })
  }
 }

 module.exports={videoDislikeController}