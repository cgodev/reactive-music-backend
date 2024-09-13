// Express
import express from "express";

// Modules
import { saveRoom, getRoomById, updateRoom, addSong, getRoom, clear } from "../controllers/roomController";
import validateJWT from "../middlewares/jwt-validator";

function rooms(app){
    const router = express.Router();
    app.use("/api/rooms", router);

    //rooms/get-all or index route "/"
    router.get("/",validateJWT, getRoom);
    router.post("/save", validateJWT, saveRoom);
    router.put("/:id", updateRoom);
    router.post("/:id", addSong);
    router.get("/:id", getRoomById);
    router.get("/clear/:id", clear);
}

export default rooms;