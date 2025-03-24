const {userModel} =require("../models/userModel/userModel")
const bcrypt=require('bcrypt');
const {cloudinary}=require('../config/cloudinary')
const {mongoose}=require('../config/db')
const jwt =require('jsonwebtoken')

const userController= async(req,res)=>{
  
  try{
  
  const hashPassword =await bcrypt.hash(req.body.password,10);
  console.log(hashPassword)
  const uploadImage = await  cloudinary.uploader.upload(
    req.files.logoUrl.tempFilePath
  )
  console.log(uploadImage)
  const newUser =await userModel({
    _id: new mongoose.Types.ObjectId,
    email:req.body.email,
    password:hashPassword,
    channelName:req.body.channelName,
    phone:req.body.phone,
    logoUrl:uploadImage.secure_url,
    logoId:uploadImage.public_id,
  })
  
  let user = await newUser.save()
  res.status(201).json({
    user
  })
  
  
  }
  catch(error){
   console.log(error)
   res.json({
    msg:"error"
   })
   }
  }

// login



const userloginController = async(req,res)=>{
 
try{

const existingUser =await userModel.findOne({email:req.body.email})
if(!existingUser){
  return res.status(404).json({
    message:"user not find"
  })
}
const isValid =await bcrypt.compare(
  req.body.password,existingUser.password
)
if(!isValid){
  return res.status(500).json({
    msg:"invalid password"
  })
}
const token =jwt.sign({
  _id:existingUser._id,
  channelName:existingUser.channelName,
  email:existingUser.email,
  phone:existingUser.phone,
  logoId:existingUser.logoId,
},process.env.JWT_TOKEN,{expiresIn:"10d"})

res.status(200).json({
  _id:existingUser._id,
  channelName:existingUser.channelName,
  email:existingUser.email,
  phone:existingUser.phone,
  logoId:existingUser.logoId,
  logoUrl:existingUser.logoUrl,
  token:token,
  subscribers:existingUser.subscribers,
  subscribedChannels:existingUser.subscribedChannels
})

}catch(error){
  console.log(error)
  res.json({
    msg:"error"
  })
}


}



module.exports={userController,userloginController}