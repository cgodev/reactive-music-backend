// Packages
const mongoose = require("mongoose");

// Config
const { config } = require("../config/index");

const dbConnection = async () => {
    try {
        mongoose.connect(config.databaseUrl);
        console.log("Database connection succesfully");
    } catch (error) {
        console.error(`No nos logramos conectar a la base de datos`);
        throw new Error("There was an error while connecting database");
    }
}

module.exports = {
    dbConnection
}