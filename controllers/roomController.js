// Modules
const Room = require("../models/Room");
const { success, error } = require("../utils/responses/responses");

async function saveRoom(req, res){
    if(!req.cookies.token){
        return error(req, res, 400, "No token found");
    }

    try {
        const roomData = req.body;
        const roomExists = await Room.findOne({ id_playlist: req.body.id_playlist });

        if(roomExists){
            return error(req, res, 400, "Room already exists");
        }

        const room = new Room(roomData);
        await room.save();

        return success(req, res, 201, "Room created successfully");

    } catch (e) {
        console.log(e.message);
        return error(req, res, 400, "There was an error while creating the room, ", e.message);
    }
}

module.exports = {
    saveRoom
}