const {userModel} =require("../models/userModel/userModel")
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken')


const unsubscribeChannelController =async (req,res)=>{

try{

const  userA =  await jwt.verify( req.headers.authorization.split(" ")[1],process.env.JWT_TOKEN)
 console.log("userA",userA)
 const userB =await userModel.findById(req.params.userBId)
console.log("userB",userB)

if(userB.subscribedby.includes(userA._id)){
 
// unsubcribe logic
userB.subscribers -=1
 userB.subscribedby = userB.subscribedby.filter(userId=>userId.toString()!=userA._id)


//  unsubscribe own channel
 userB.subscribedby = userB.subscribedby.filter(userId=>userId.toString()!=userB._id)
 userB.subscribedChannels = userB.subscribedChannels.filter(userId=>userId.toString()!=userB._id)
 
 await userB.save()
 const userAFullinformation= await userModel.findById(userA._id)
   userAFullinformation.subscribedChannels.filter(userId=>userId.toString()!=userB._id)
  
  
 await userAFullinformation.save()
 res.status(200).json({
  msg:"you unsubscribe the channel"
 })
}
else{
  return res.status(500).json({
    msg:"not subscribe channel"
  })
}


}
catch(error){
  console.log(error)
  res.json({
    msg:"error in unsubscribe api"
  })
}
}

module.exports={unsubscribeChannelController}