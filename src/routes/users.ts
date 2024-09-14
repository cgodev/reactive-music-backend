/* 
    Ruta: /api/users
*/

import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/users';
import { check } from 'express-validator'
import validateFields from '../middlewares/field-validators';
import validateJWT from '../middlewares/jwt-validator';

function users(app) {
    
    const router = Router();
    app.use("/api/users", router);

    router.get('/', getUsers);

    router.post('/', [
        check('username', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateFields
    ], createUser);

    router.put('/:id', [
        validateJWT,
        check('username', 'Name is required').not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        // validateFields,
    ], updateUser);

    router.delete('/:id', validateJWT, deleteUser);
}

export default users;