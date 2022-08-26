const jwt =require('jsonwebtoken')
const JWT_SECRET = "harryisagoodB$oy"

const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({error: "please authenticate using valid token"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user;
        next();
    }catch{
        res.status(401).send({error: "please authenticate using valid token"})
    }
}

module.exports=fetchuser;