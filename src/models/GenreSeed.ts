// Packages
import { model, Schema } from 'mongoose';

const GenreSeedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

export default model("GenreSeed", GenreSeedSchema);