const express=require('express');
const { userRoute } = require('./src/routes/userRoute');
const bodyParser= require('body-parser')
const fileUpload =require("express-fileupload");
const { vedioRoute } = require('./src/routes/vedioRoute');
const { commentRoute } = require('./src/routes/commentRoute');
const app =express();

app.use(bodyParser.json());

require('dotenv').config();

app.use(express.json());


app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/temp/"
}))

app.use("/user",userRoute)

app.use(vedioRoute)

app.use('/comment',commentRoute)
 const port =process.env.PORT;
 app.listen(port,(req,res)=>{
  console.log( `server is running on port:${port}`)
 })