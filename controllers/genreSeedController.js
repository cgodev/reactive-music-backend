// Modules
const GenreSeed = require("../models/GenreSeed");
const { success, error } = require("../utils/responses/responses");




async function getGenresSeeds(req, res) {
    try {
        const seeds = await GenreSeed.find({}, 'name');

        res.status(200).json({
            ok: true,
            seeds
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error.message,
            rooms: []
        })
    }
}

module.exports = {
    getGenresSeeds
}