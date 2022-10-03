// Express
const express = require("express");

// Modules
const { saveRoom } = require("../controllers/roomController");

function rooms(app){
    const router = express.Router();
    app.use("/api/rooms", router);

    router.get("/", saveRoom);
}

module.exports = rooms;