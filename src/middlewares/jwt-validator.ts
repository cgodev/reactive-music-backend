import jwt from "jsonwebtoken";

const jwtSecret = /* process.env.JWT_SECRET */ 'YULkerKiv2020_LOSPRikwDinamOV';

const validateJWT = (req, res, next) => {
    /* Read token */
    const token = req.header('x-token') as string;

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: `No token provided`
        });
    }

    try {
        if (!jwtSecret) {
            return res.status(500).json({
                ok: false,
                message: `Internal error.`
            });
        } else {
            const uid = jwt.verify(token, jwtSecret);
            req.body.user = uid;
            next();
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: `No valid token.`
        });
    }


}

export default validateJWT;