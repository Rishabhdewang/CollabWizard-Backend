const jwt = require("jsonwebtoken");

function generateAccessToken(payload,expiresTime='1800s') {
    console.log(expiresTime);
    if(expiresTime){
        // expires after half and hour (1800 seconds = 30 minutes)
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresTime});
    }else {
        console.log('without expires time');
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
}

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['Authorization'];

    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    if (token == null) return res.sendStatus(401) // if there isn't any token
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log(err);
      if (err) return res.sendStatus(403)
      req.user = user
      next() // pass the execution off to whatever request the client intended
    })
}

module.exports = {
    authenticateToken,
    generateAccessToken
}