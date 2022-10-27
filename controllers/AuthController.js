// Packages
const { Buffer } = require("buffer");
const axios = require("axios").default;
const qs = require("qs");

// Modules
const { success, error } = require("../utils/responses/responses");
const Room = require("../models/Room");

// Config
const { config } = require("../config/index");

function auth(req, res){
    const params = new URLSearchParams({
        client_id: config.client_id,
        redirect_uri: config.redirect_url,
        scope: config.spotifyAccountsScopes,
        response_type: "code"
    });
    
    return res.redirect(config.spotifyAccountsUrl+"/authorize?"+params);
}

async function getToken(req, res){
    const code = req.query.code || "";
    const auth64 = Buffer.from(config.client_id + ":" + config.client_secret).toString("base64");
    const body = {
        grant_type: "authorization_code",
        redirect_uri: config.redirect_url,
        code: code,
    };

    try {
        const { data, status } = await axios({
            method: "POST",
            url: config.spotifyAccountsUrl+"/api/token",
            data: qs.stringify(body),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${auth64}`,
            }
        });

        if(data || status == 200){
            res.cookie("token", data.access_token, { maxAge: 1 * data.expires_in * 1000 });
            res.cookie("refresh_token", data.refresh_token);
        } else {
            return error(req, res, 400, "Cannot get a token");
        }

        return res.redirect(config.redirect_client_url);

    } catch (e) {
        return res.send("Cannot get a token, please try again");
    }
}

async function refreshToken(req, res){
    let updatedRoom = {};
    const { room_id, uid, user_role } = req.query;
    const refreshToken = req.cookies.refresh_token;
    const auth64 = Buffer.from(config.client_id + ":" + config.client_secret).toString("base64");

    const body = {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    }

    try {
        if((user_role != "HOST_ROLE") && (!room_id || !uid)){
            return error(req, res, 400, "room_id and uid are required");
        }

        const { data, status } = await axios({
            method: "POST",
            url: config.spotifyAccountsUrl+"/api/token",
            data: qs.stringify(body),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${auth64}`,
            }
        });

        if(!data || status != 200){
            return error(req, res, 400, "Cannot get a refreshed token");
        }

        res.cookie("token", data.access_token, { maxAge: 1 * data.expires_in * 1000 });

        if(user_role != "HOST_ROLE"){
            updatedRoom = await Room.findOneAndUpdate(
                { $and: [ { _id: room_id }, { uid } ] }, 
                { token: data.access_token },
                { new: true, fields: { "__v": 0 } }
            );
        }

        return success(req, res, 200, "Token refreshed successfully", updatedRoom);         
    } catch (e) {
        return error(req, res, 400, "Cannot get a refreshed token");
    }
}

module.exports = {
    auth,
    getToken,
    refreshToken
};