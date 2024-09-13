// Packages
import mongoose from "mongoose";

// Config
import config from "../config/index";

const dbConnection = async () => {
    try {
        mongoose.connect(/* config.databaseUrl */ "mongodb+srv://cgodev:KEQJWgTocfuEAr2x@cluster0.frlfl.mongodb.net/reactive_music" || '');
    } catch (error) {
        console.error(`No nos logramos conectar a la base de datos`);
        throw new Error("There was an error while connecting database");
    }
}

module.exports = {
    dbConnection
}