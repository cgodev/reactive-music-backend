// Packages
import { model, Schema } from "mongoose";

const RoomSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: false
    },
    id_playlist: {
        type: String,
        required: true
    },
    spotify_uid:{
        type: String,
        required: false
    },
    token: {
        type: String,
        required: false
    },
    refresh_token: {
        type: String,
        required: false
    },
    genres_seed: {
        type: String,
        required: false
    },
    access_url: {
        type: String,
        required: true
    }
});

export default model("Rooms", RoomSchema);