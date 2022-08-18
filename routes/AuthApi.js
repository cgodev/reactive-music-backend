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
        this.router.get("/", this.controller.auth);
        this.router.get("/callback", this.controller.signIn);
    }
}

module.exports = AuthApi;