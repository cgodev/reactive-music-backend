// Modules
const Room = require("../models/Room");
const { success, error } = require("../utils/responses/Responses");

async function saveRoom(req, res) {
    if (!req.cookies.token) {
        return error(req, res, 400, "No token found");
    }

    try {
        const roomData = req.body;
        const roomExists = await Room.findOne({ id_playlist: req.body.id_playlist });

        if (roomExists) {
            return error(req, res, 400, "Room already exists");
        }

        const room = new Room(roomData);
        room.uid = req.body.user;
        room.access_url = roomData.access_url + "/" + room._id;
        await room.save();

        return success(req, res, 201, "Room created successfully", room);

    } catch (e) {
        return error(req, res, 400, "There was an error while creating the room, please try again", null);
    }
}


async function getRooms(req, res) {
    try {
        const rooms = await Room.find({}, 'uid name id_playlist token refresh_token genres_seed access_url');

        res.status(200).json({
            ok: true,
            rooms
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: error.message,
            rooms: []
        })
    }
}

async function getRoomById(req, res) {
    const id = req.params.id;

    try {
        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({
                ok: false,
                msg: `Room not found.`
            })
        }

        return res.status(200).json({
            ok: true,
            room
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error: ${error.message}`
        })
    }
}

async function updateRoom(req, res) {
    const id = req.params.id;

    try {

        const roomDB = await Room.findById(id);

        if (!roomDB) {
            return res.status(303).json({
                ok: false,
                msg: `Room not found`
            })
        }

        const { ...campos } = req.body;

        const roomUpdated = await Room.findByIdAndUpdate(id, campos, { new: true });

        return res.status(200).json({
            ok: true,
            room: roomUpdated
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: `Error: ${error.message}`
        })
    }
}

module.exports = {
    getRooms,
    saveRoom,
    getRoomById,
    updateRoom
}