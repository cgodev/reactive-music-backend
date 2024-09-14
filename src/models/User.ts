import { Schema, model } from "mongoose";

const UserSchema = new Schema({

    username: {
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
    }
});

/* Customize response from internal mongoose schema in order to handle property names and realize operations. */

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

export default model('User', UserSchema);