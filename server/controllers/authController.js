const bcrypt = require('bcrypt'); 
const User = require('../model/User'); 
const jwt = require('jsonwebtoken'); 
const handleLogin = async (req, res) => {
    const {username, password} = req.body; 
    if (!username || !password) return res.status(400).json({'message':'Username and Password are required'}); 
    try { 
        const foundUser = await User.findOne({username:username}); 
        if (!foundUser) return res.sendStatus(401); // unauthorized 
        const match = await bcrypt.compare(password,foundUser.password); 
        if (match) { 
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const token = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    }
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({"message":`User ${foundUser.username} logged in successfully`, token:token,}); 
        } else { 
            res.sendStatus(401); 
        } 
    } catch(err) { 
        console.log(err); 
        res.status(500).json({'message':'something wentt wrong'}); 
    }
}; 

module.exports = {handleLogin}; 