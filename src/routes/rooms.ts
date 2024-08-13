// Express
import express from "express";

// Modules
import { saveRoom, getRooms, getRoomById, updateRoom } from "../controllers/roomController";
import validateJWT from "../middlewares/jwt-validator";

function rooms(app){
    const router = express.Router();
    app.use("/api/rooms", router);

    //rooms/get-all or index route "/"
    router.get("/", getRooms);
    router.post("/save", validateJWT, saveRoom);
    router.put("/:id", validateJWT, updateRoom);
    router.get("/:id", getRoomById);
}

export default rooms;