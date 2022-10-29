/* 
    Ruta: /api/users
*/

const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/field-validators');
const { validarJWT } = require('../middlewares/jwt-validator');

function users(app) {
    
    const router = Router();
    app.use("/api/users", router);

    router.get('/', getUsers);

    router.post('/', /* [
            check('name', 'Param name is required').not().isEmpty(),
            check('password', 'Param password is required').not().isEmpty(),
            check('email', 'Param email is required').isEmail(),
        validateFields
    ],  */createUser);

    router.put('/:id', [
        /* Middlewares */
        /* validarJWT, */
        /* check('name', 'Param name is required').not().isEmpty(),
        check('role', 'Param role is required').not().isEmpty(),
        check('email', 'Param email is required').isEmail(),
        validateFields, */
    ], updateUser);

    router.delete('/:id', [
        /* Middlewares */
        /* validarJWT */
    ], deleteUser);

}



module.exports = users;