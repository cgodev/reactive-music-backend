// Express
const express = require("express");

// Modules
const AuthController = require("../controllers/AuthController");

// Routes
class AuthApi {
    router;
    controller;

    constructor(app){
        this.router = express.Router();
        this.controller = new AuthController();
        app.use("/api/auth", this.router);
    }

    routes(){
        this.router.get("/", (...args) => {
            return this.controller.auth(...args);
        });

        this.router.get("/callback", (...args) => {
            return this.controller.getToken(...args);
        });
    }
}

module.exports = AuthApi;