// Modules
import Room from "../models/Room";
import { success, error } from "../utils/responses/Responses";

async function saveRoom(req, res) {

    try {
        const roomData = req.body;
        
        const roomExists = await Room.findOne({ uid: req.body.user.uid });
        
        if (roomExists) {
            return error(req, res, 400, "Room already exists", null);
        }

        const room = new Room(roomData);
        room.uid = req.body.user.uid;
        room.access_url = roomData.access_url + "/" + room._id;
        await room.save();

        return success(req, res, 201, "Room created successfully", room);

    } catch (e) {
        return error(req, res, 400, "There was an error while creating the room, please try again", null);
    }
}

async function getRoom(req, res) {


    try {
        const roomExists = await Room.findOne({ uid: req.body.user.uid });

        if (!roomExists) {
            return error(req, res, 400, "Not room yet", null);
        }

        return success(req, res, 201, "Room created successfully", roomExists);

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
    } catch (error: any) {
        res.status(500).json({
            ok: true,
            message: error.message,
            rooms: []
        })
    }
}

async function getRoomById(req, res) {
    const id = req.params.id;

    try {
        const room = await Room.findById(id);

        if (!room) {
            return error(req, res, 404, "Playlist not found.", null);
        }

        return success(req, res, 200, "ok", room)
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: `Error: ${error.message}`
        })
    }
}

async function clear(req, res) {
    const id = req.params.id;

    try {
        const room = await Room.findById(id);

        if (!room) {
            return error(req, res, 404, "Playlist not found.", null);
        }
        const roomUpdated = await Room.findByIdAndUpdate(id, { tracks: [] }, { new: true, useFindAndModify: true });

        return success(req, res, 200, "ok", roomUpdated)
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: `Error: ${error.message}`
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
                message: `Room not found`
            })
        }

        const { ...campos } = req.body;

        const roomUpdated = await Room.findByIdAndUpdate(id, campos, { new: true });

        return res.status(200).json({
            ok: true,
            room: roomUpdated
        })

    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: `Error: ${error.message}`
        })
    }
}

async function addSong(req, res) {
    const id = req.params.id;

    try {

        const roomDB = await Room.findById(id);

        if (!roomDB) {
            return res.status(303).json({
                ok: false,
                message: `Room not found`
            })
        }

        const track = req.body;

        const roomUpdated = await Room.findByIdAndUpdate(id, { $addToSet: { tracks: track } }, { new: true, useFindAndModify: true }).populate('tracks');

        return res.status(200).json({
            ok: true,
            room: roomUpdated
        })

    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: `Error: ${error.message}`
        })
    }
}


export {
    getRooms,
    saveRoom,
    getRoomById,
    updateRoom,
    addSong,
    getRoom,
    clear
}