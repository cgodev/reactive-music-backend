const User = require('../models/User');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const { JWTGenerator } = require('../helpers/jwt');

const getUsers = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    const [users, total] = await Promise.all([
        User
            .find({}, 'name email role img')
            .skip(desde)
            .limit(5),
        User.countDocuments()
    ])
    res.status(200).json({
        ok: true,
        users,
        total
    })
}

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    console.log(`Data ${JSON.stringify(req.body)}`);

    try {


        const userExist = await User.findOne({
            email
        });

        if (userExist) {
            return res.status(400).json({
                ok: false,
                msg: `User already registered.`
            })
        }

        const user = new User(req.body);

        //Eencrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await JWTGenerator(user.id);
        res.status(200).json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Unhandled exception, review your logs...`
        })
    }



}

const updateUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        //Verify if user exist:
        if (!userDB) {
            return res.status(303).json({
                ok: false,
                msg: `User not found.`
            })
        }

        //Collect values
        let { password, email, ...fields } = req.body;


        //Case: updating your email needs to verify that new email is not already used.
        if (userDB.email !== email) {
            const emailVerifier = await User.findOne({ email });
            if (emailVerifier) {
                return res.status(400).json({
                    ok: false,
                    message: `Another account has this email.`
                })
            }
        }

        fields = {
            ...fields,
            email,
        }
        
        //console.log(`Fields to update ${JSON.stringify(fields)}`);

        const userUpdated = await User.findByIdAndUpdate(uid, fields, { new: true });

        return res.status(200).json({
            ok: true, 
            user: userUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: `Unhandled exception, review your logs...`
        })
    }
}

const deleteUser = async (req, res = response) => {

    try {

        const uid = req.params.id;

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(303).json({
                ok: false,
                msg: `User not found`
            })
        }

        await User.findByIdAndDelete(uid)

        return res.status(200).json({
            ok: true,
            message: `User deleted`
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: `Unhandled exception, review your logs...`
        })
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}