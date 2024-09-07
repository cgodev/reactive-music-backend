import { model, Schema } from "mongoose";
import { Track } from "./Track";

interface IRoom extends Document {
    uid: string;
    name: string;
    accessUrl: string;
    description: string;
    tracks: Track[];
}

const trackShchema = new Schema<Track>({

})




const RoomSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: false
    },
    access_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tracks: {
        type: [trackShchema],
    }

});

RoomSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})

export default model("Rooms", RoomSchema);