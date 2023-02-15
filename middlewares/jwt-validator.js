const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    /* Read token */
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            message: `No token provided`
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = uid;
        next();
    }catch(error){
        return res.status(500).json({
            ok: false,
            message: `No valid token.`
        });
    }

    
}

module.exports = {
    validateJWT
}