// Modules
import { success, error } from "../utils/responses/Responses";
import youtubesearchapi from 'youtube-search-api'

async function search(req, res) {

    const criteria = req.query.criteria;

    const result = await youtubesearchapi.GetListByKeyword(criteria, false, 10, [{ type: "video" }])


    if (!result) {
        return error(req, res, 404, "Tracks not found", []);
    }

    return success(req, res, 200, "Success", result);
}

export {
    search
}