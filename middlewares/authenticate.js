const jwt = require("jsonwebtoken");

function generateAccessToken(payload,expiresTime='18000s') {
    console.log(expiresTime);
    if(expiresTime){
        // expires after half and hour (18000 seconds = 300 minutes = 5hours)
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresTime});
    }else {
        console.log('without expires time');
        return jwt.sign(payload, process.env.JWT_SECRET);
    }
}

const authenticateToken = (req,res,next)=>{

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

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