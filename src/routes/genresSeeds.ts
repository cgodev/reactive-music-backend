// Express
import express from 'express';
// Modules
import getGenresSeeds from '../controllers/genreSeedController';

function genresSeeds(app){
    const router = express.Router();
    app.use("/api/genres", router);
   
    router.get("/", getGenresSeeds);
}

export default genresSeeds;