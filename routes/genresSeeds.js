// Express
const express = require("express");

// Modules
const { getGenresSeeds } = require("../controllers/genreSeedController");

function genresSeeds(app){
    const router = express.Router();
    app.use("/api/genres", router);
   
    router.get("/", getGenresSeeds);
}

module.exports = genresSeeds;