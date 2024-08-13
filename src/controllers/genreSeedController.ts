// Modules
import GenreSeed from '../models/GenreSeed';

async function getGenresSeeds(req, res) {
    try {
        const seeds = await GenreSeed.find({}, 'name');

        res.status(200).json({
            ok: true,
            seeds
        })
    } catch (error: any) {
        res.status(500).json({
            ok: true,
            msg: error.message,
            rooms: []
        })
    }
}

export default getGenresSeeds;