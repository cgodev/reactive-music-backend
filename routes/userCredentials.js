/* 
    Ruta: /api/credentials
*/

const { Router } = require('express');
const { getCredential, createCredentials, updateCredentials } = require('../controllers/userCredentials');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

function credentials(app) {
    
    const router = Router();
    app.use("/api/credentials", router);

    router.get('/', validateJWT, getCredential);

    router.post('/', /* Add validators array here!! */createCredentials);

    router.put('/:id'/* Add validators array here!! */, updateCredentials);

}



module.exports = credentials;