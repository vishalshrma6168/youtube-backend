const {mongoose}=require('../../config/db')

const videoSchema =new mongoose.Schema({
  _id:mongoose.Types.ObjectId,
tittle:{type:String,required:true},
discription:{type:String,required:true},
user_id:{type:String,required:true},
videoUrl:{type:String,required:true},
videoId:{type:String,required:true},
thumbnailUrl:{type:String,required:true},
thumbnailId:{type:String,required:true},
category:{type:String,required:true},
tags:[{type:String}],
likes:{type:Number ,default:0},
dislikes:{type:Number ,default:0},
views:{type:Number,default:0},
likedby: [{type:mongoose.Types.ObjectId, ref:"user"}],
dislikeby: [{type:mongoose.Types.ObjectId, ref:"user"}],
// viewedby:[{type:mongoose.Types.ObjectId, ref:"user"}]

},{timestamps:true})
const videoModel =mongoose.model("video",videoSchema)

module.exports={videoModel}