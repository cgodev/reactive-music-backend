// Express
import express from "express";

// Modules
import { search } from "../controllers/searchController";

function searchRouter(app){
    const router = express.Router();
    app.use("/api/search", router);

    //rooms/get-all or index route "/"
    router.get("/", search);
}

export default searchRouter;