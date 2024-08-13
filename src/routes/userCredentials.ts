/* 
    Ruta: /api/credentials
*/

import { Router } from "express";
import { getCredential, createCredentials, updateCredentials } from '../controllers/userCredentials';
import { check } from "express-validator";
import validateFields from '../middlewares/field-validators';
import validateJWT from '../middlewares/jwt-validator';


function credentials(app) {
    
    const router = Router();
    app.use("/api/credentials", router);

    router.get('/', validateJWT, getCredential);

    router.post('/', validateJWT, createCredentials);

    router.put('/:id', validateJWT, updateCredentials);

}


export default credentials;