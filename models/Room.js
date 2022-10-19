// Packages
const { model, Schema } = require("mongoose");

const RoomSchema = Schema({
    uid: {
        type: String,
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