 const jwt =require('jsonwebtoken')

 const checkauth = async(req,res,next)=>{
  try{
    const token =  req.headers.authorization.split(" ")[1]
    if(!token){
      return res.status(401).json({
        error:"no toeken is provided"
      })
    }
    
    // decode
    
    const decodeUser = await jwt.verify(token,process.env.JWT_TOKEN);
    // attach y=user
    req.user =decodeUser;
    next();

    }catch(error){
      console.log(error)
      res.json({
        msg:"invalid token"
      })
    }
 }
 module.exports={checkauth}