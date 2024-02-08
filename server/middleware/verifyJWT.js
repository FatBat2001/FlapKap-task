const jwt = require('jsonwebtoken');
const verifyJWT = (req, res, next) => {
    const cookies = req.cookies; 
    
    if (!cookies?.jwt) return res.sendStatus(401);
    const token = cookies.jwt; 
    
    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.username = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    );
}
module.exports = verifyJWT; 