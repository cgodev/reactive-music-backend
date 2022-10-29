const { response } = require('express');
const User = require('../models/User');
const UserCredential = require('../models/UserCredential');

const getCredential = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const credentials = await UserCredential.findOne({ user: uid });

        if (!credentials) {
            return res.status(400).json({
                ok: false,
                msg: `credentials not found.`
            })
        }

        return res.status(200).json({
            ok: true,
            credentials
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: `Unhandled error, review your logs....`
        })
    }
}


const createCredentials = async (req, res = response) => {

    console.log(`Input`);
    const { client_id, client_secret, user } = req.body;

    //verify user exist
    const userDB = await User.findById(user);

    if (!userDB) {
        return res.status(400).json({
            ok: false,
            msg: `User not found.`
        })
    }

    //Verify that not exist credentials for the user

    const credentials = await UserCredential.findOne({ user });

    if (credentials) {
        return res.status(400).json({
            ok: false,
            msg: `Already exist credentials for this user.`
        })
    }

    const newCredentials = await UserCredential.create({ client_id, client_secret, user });

    return res.status(200).json({
        ok: true,
        credentials: newCredentials
    })
}


const updateCredentials = async (req, res = response) => {
    const uid = req.params.id;

    //Verify that credentials exists
    const credentials = await UserCredential.findById(uid)
    if (!credentials) {
        return res.status(400).json({
            ok: false,
            msg: `Credentials not found.`
        })
    }

    const {...fields} = req.body;

    const credentialsUpdated = await UserCredential.findByIdAndUpdate(uid, fields, { new: true })

    return res.status(200).json({
        ok: true,
        credentials: credentialsUpdated
    })
}

module.exports = {
    getCredential,
    createCredentials,
    updateCredentials
}

