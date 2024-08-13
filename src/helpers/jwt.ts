import jwt from 'jsonwebtoken';


const jwtSecret = process.env.JWT_SECRET;

const JWTGenerator = ( uid ) => {

    return new Promise ((resolve, reject) => {
        const payload = {
            uid
        };

        if (!jwtSecret) {
            reject(`Can't generate token.`);
        } else {
            jwt.sign( payload,jwtSecret, {
                expiresIn: '12h',
            }, (err, token) => {
                if(err){
                    reject(`Can't generate token.`)
                }else{
                    resolve(token);
                }
            });
        }
    
        
    })
}

export default JWTGenerator;