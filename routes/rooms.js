// Express
const express = require("express");

// Modules
const { saveRoom } = require("../controllers/roomController");

function rooms(app){
    const router = express.Router();
    app.use("/api/rooms", router);

    //rooms/get-all or index route "/"
    router.post("/save", saveRoom);
}

module.exports = rooms;