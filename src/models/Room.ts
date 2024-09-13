import { model, Schema } from "mongoose";

const trackShchema = new Schema({
    name: {type: String, required: true},
    artist: {type: String}, 
})

const RoomSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    access_url: {
        type: String,
        required: true
    },
    annotations: {
        type: String,
    },
    tracks: {
        type: [trackShchema],
    }
});

RoomSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

export default model("Rooms", RoomSchema);