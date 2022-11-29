// Packages
const { model, Schema } = require("mongoose");

const RoomSchema = Schema({
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
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    genres_seed: {
        type: [String],
        required: false
    },
    access_url: {
        type: String,
        required: true
    }
});

module.exports = model("Rooms", RoomSchema);