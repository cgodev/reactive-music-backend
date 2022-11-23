// Express
const express = require("express");

// Modules
const { saveRoom, getRooms, getRoomById, updateRoom } = require("../controllers/roomController");
const { validateJWT } = require("../middlewares/jwt-validator");

function rooms(app){
    const router = express.Router();
    app.use("/api/rooms", router);

    //rooms/get-all or index route "/"
    router.get("/", getRooms);
    router.post("/save", validateJWT, saveRoom);
    router.put("/:id", validateJWT, updateRoom);
    router.get("/:id", getRoomById);
}

module.exports = rooms;