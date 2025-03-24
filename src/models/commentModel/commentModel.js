const {mongoose}=require('../../config/db')

const commentSchema =new mongoose.Schema({
  _id:mongoose.Types.ObjectId,

userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'user'},

videoId:{type:String,required:true},
commentText:{type:String,required:true}

},{timestamps:true})
const commentModel =mongoose.model("comment",commentSchema)

module.exports={commentModel}