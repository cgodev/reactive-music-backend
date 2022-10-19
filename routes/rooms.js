// Express
const express = require("express");

// Modules
const { saveRoom, getRooms, getRoomById, updateRoom } = require("../controllers/roomController");

function rooms(app){
    const router = express.Router();
    app.use("/api/rooms", router);

    //rooms/get-all or index route "/"
    router.post("/save", saveRoom);
    router.get("/", getRooms);
    router.get("/:id", getRoomById);
    router.put("/:id", updateRoom);
}

module.exports = rooms;