const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'HOST_ROLE'
    },

});

/* Customize response from internal mongoose schema in order to handle property names and realize operations. */

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

module.exports = model('User', UserSchema);