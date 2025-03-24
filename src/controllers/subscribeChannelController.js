const {userModel} =require("../models/userModel/userModel")
const bcrypt=require('bcrypt');
const {cloudinary}=require('../config/cloudinary')
const {mongoose}=require('../config/db')
const jwt =require('jsonwebtoken')

const subscribeChannelController =async (req,res)=>{

  try{
 const  userA =  await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
 console.log("userA",userA)
 const userB= await userModel.findById(req.params.userBId)
 console.log("userB",userB)
 
 if(userB.subscribedby.includes(userA._id)){
  return res.json({
    msg:"already subscribed channel"
  })
 }else{
 
 userB.subscribers +=1
 userB.subscribedby.push(userA._id)
  await userB.save()
   const userAFullInformation = await userModel.findById(userA._id)
  userAFullInformation.subscribedChannels.push(userB._id)
  await userAFullInformation.save()
  res.status(200).json({
    msg:"you subscribed cahnnel"
  })
 }

  }catch(error){
    console.log(error)
    res.json({
      msg:"error in subscribe userb api"
    })
  }

}
module.exports={subscribeChannelController}