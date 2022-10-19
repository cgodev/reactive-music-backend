// Packages
const { model, Schema } = require("mongoose");

const GenreSeedSchema = Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = model("GenreSeed", GenreSeedSchema);