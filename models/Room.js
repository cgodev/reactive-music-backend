// Packages
const { model, Schema } = require("mongoose");

const Room = Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    idPlaylist: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    genresSeed: {
        type: [String],
        required: false
    }
});

module.exports = model("Room", Room);