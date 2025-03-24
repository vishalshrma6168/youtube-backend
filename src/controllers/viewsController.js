const { videoModel } = require("../models/vedioModel/vedioModel")

 
 const viewsController= async(req,res)=>{

try{
 const video = await videoModel.findById(req.params.videoId)
  
  video.views+=1;
  console.log(video)
  await video.save()
  res.status(200).json({
    msg:"oki you see the video"
  })


}
catch(error){
  console.log(error)
  res.json({
    msg:"error in views api"
  })
}

 }
 module.exports={viewsController}