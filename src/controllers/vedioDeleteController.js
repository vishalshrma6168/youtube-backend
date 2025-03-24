const jwt =require('jsonwebtoken')
const { videoModel } = require('../models/vedioModel/vedioModel')
const { cloudinary } = require('../config/cloudinary')

const vedioDeleteController= async(req,res)=>{

try{

 const verifyUser = await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
// console.log( "verfiyuser",verifyUser)
  const video =   await videoModel.findById(req.params.videoId)
  console.log("video",video)
     if(video.user_id == verifyUser._id){
      // delete- vedio,data ,thumbnail
      await cloudinary.uploader.destroy(video.videoId,{resource_type:'video'})
      await cloudinary.uploader.destroy(video.thumbnailId)
   const deletedresonse=   await  videoModel.findByIdAndDelete(req.params.videoId)
      res.json({
        msg:"video delete",
        result:deletedresonse
      })
     }
else{
  res.json({
    msg:"you have not permiison to delete"
  })
}

}
catch(error){
  console.log(error)
  res.json({
    msg:"something went  wrong"
  })
}
}


module.exports={vedioDeleteController}