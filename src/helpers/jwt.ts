import jwt from 'jsonwebtoken';


const jwtSecret = /* process.env.JWT_SECRET */ 'YULkerKiv2020_LOSPRikwDinamOV';

const JWTGenerator = ( uid ) => {

    return new Promise ((resolve, reject) => {
        const payload = {
            uid
        };

        if (!jwtSecret) {
            reject(`Can't generate token jwt not found.`);
        } else {
            jwt.sign( payload,jwtSecret, {
                expiresIn: '12h',
            }, (err, token) => {
                if(err){
                    reject(`Can't generate token by other things.${JSON.stringify(err)}`);
                }else{
                    resolve(token);
                }
            });
        }
    
        
    })
}

export default JWTGenerator;