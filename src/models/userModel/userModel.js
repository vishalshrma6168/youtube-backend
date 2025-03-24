const {mongoose}=require('../../config/db')

const userSchema =new mongoose.Schema({
  _id:mongoose.Types.ObjectId,
  channelName:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  logoUrl:{
    type:String,
    required:true,
  },
  logoId:{
  type:String,
  required:true,

 },
 subscribers:{
  type:Number,
  default:0,
  required:false,
 },
 subscribedChannels:[{
  type:mongoose.Types.ObjectId, ref:"user"
 }],
 subscribedby:[{ type:mongoose.Types.ObjectId, ref:"user"}]

},{timestamps:true})
const userModel =mongoose.model("user",userSchema)

module.exports={userModel}