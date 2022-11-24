/* 
    Ruta: /api/users
*/

const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/field-validators');
const { validateJWT } = require('../middlewares/jwt-validator');

function users(app) {
    
    const router = Router();
    app.use("/api/users", router);

    router.get('/', getUsers);

    router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ], createUser);

    router.put('/:id', [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        // validateFields,
    ], updateUser);

    router.delete('/:id', validateJWT, deleteUser);
}

module.exports = users;