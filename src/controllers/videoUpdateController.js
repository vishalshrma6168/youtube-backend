const jwt =require('jsonwebtoken')
const { videoModel } = require('../models/vedioModel/vedioModel')
const { cloudinary } = require('../config/cloudinary')


require('dotenv').config()

const vedioUpdateController = async (req,res)=>{

try{

 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
// console.log( "verfiyuser",verifyUser)
  const video =   await videoModel.findById(req.params.videoId)

console.log("video",video)
if(video.user_id == verifyUser._id){

if(req.files){
  // update thumbnail and text
    await cloudinary.uploader.destroy(video.thumbnailId)
  const updatedThumbnail =await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath)
  
  
  const updatedData ={
    tittle:req.body.tittle,
    discription:req.body.discription,
    category:req.body.category,
    tags:req.body.tags,
    thumbnailUrl:updatedThumbnail.secure_url,
    thumbnailId:updatedThumbnail.public_id,
  }
  const updatedvideoDetail = await videoModel.findByIdAndUpdate(req.params.videoId,updatedData,{new:true})
  res.status(200).json({
    updatedvideoDetail:updatedvideoDetail
  })
}else{

  const updatedData ={
    tittle:req.body.tittle,
    discription:req.body.discription,
    category:req.body.category,
    tags:req.body.tags,
    
  }
  const updatedvideoDetail = await videoModel.findByIdAndUpdate(req.params.videoId,updatedData,{new:true})
  res.status(200).json({
    updatedvideoDetail:updatedvideoDetail
  })
}

}else{
  return res.json({
    msg:"you have not permisson to update the vedio"
  })
}


}
catch(error){
  console.log(error)
  res.json({
    msg:"error in vedio update"
  })
}
}



module.exports ={vedioUpdateController}