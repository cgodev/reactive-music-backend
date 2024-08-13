// Express
import express from "express";

// Modules
import { login, auth, getToken, refreshToken } from "../controllers/AuthController";

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

export default authApi;