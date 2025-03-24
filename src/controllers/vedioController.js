const jwt =require('jsonwebtoken')

const { mongo, default: mongoose } = require('mongoose');
const { cloudinary } = require('../config/cloudinary');
const {videoModel}=require('../models/vedioModel/vedioModel')

const vedioController = async(req,res)=>{
try{

  const token =  req.headers.authorization.split(" ")[1]
  const user = await jwt.verify(token,process.env.JWT_TOKEN);
  // console.log(user)
  // console.log(req.body)
  // console.log(req.files.vedio)
  
  // console.log(req.files.thumbnail)
  const uploadedvideo = await cloudinary.uploader.upload(req.files.video.tempFilePath,{
    resource_type:"video"
  })
  const uploadedthumbnail = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath)
  // console.log("vedio",uploadedvideo)
  // console.log("thumbnail",uploadedthumbnail)


  const video = new videoModel({
      _id: new mongoose.Types.ObjectId,
    tittle:req.body.tittle,
    discription:req.body.discription,
    user_id:user._id,
    videoUrl:uploadedvideo.secure_url,
    videoId:uploadedvideo.public_id,
    thumbnailUrl:uploadedthumbnail.secure_url,
    thumbnailId:uploadedthumbnail.public_id,
    category:req.body.category,
    tags: req.body.tags,
   
  })
  const uploadedvideodata= await video.save()
  res.status(200).json({
    video:uploadedvideodata
  })



}catch(error){
  console.log(error)
  res.json({
    msg:"error in vediocontroller"
  })
}

}


module.exports={vedioController}