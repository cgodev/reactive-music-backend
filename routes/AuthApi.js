// Express
const express = require("express");

// Modules
const { login, auth, getToken, refreshToken } = require("../controllers/AuthController");

// Routes
function authApi(app){
    const router = express.Router();
    app.use("/api/auth", router);
    //router.get("/", auth);
    router.get("/:client_secret/:client_id", auth);
    router.get("/callback", getToken);
    router.get("/refresh-token", refreshToken);
    /* Login for users */
    router.post("/", login);
}

module.exports = authApi;