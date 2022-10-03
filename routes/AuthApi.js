// Express
const express = require("express");

// Modules
const { auth, getToken, refreshToken } = require("../controllers/authController");

// Routes
function authApi(app){
    const router = express.Router();
    app.use("/api/auth", router);

    router.get("/", auth);
    router.get("/callback", getToken);
    router.get("/refresh-token", refreshToken);
}

module.exports = authApi;