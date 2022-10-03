// Packages
const { Buffer } = require("buffer");
const axios = require("axios").default;
const qs = require("qs");

// Modules
const { success, error } = require("../utils/responses/responses");

// Config
const { config } = require("../config/index");

function auth(req, res){
    const params = new URLSearchParams({
        client_id: config.client_id,
        redirect_uri: config.redirect_url,
        scopes: config.spotifyAccountsScopes,
        response_type: "code"
    });
    
    res.redirect(config.spotifyAccountsUrl+"/authorize?"+params);
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

        return success(req, res, 200, null, data);

    } catch (e) {
        return error(req, res, 400, "Cannot get a token");
    }
}

async function refreshToken(req, res){
    const refreshToken = req.cookies.refresh_token;
    const auth64 = Buffer.from(config.client_id + ":" + config.client_secret).toString("base64");

    const body = {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    }

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
        } else {
            return error(req, res, 400, "Cannot get a refreshed token");
        }

        return success(req, res, 200, null, data);

    } catch (e) {
        return error(req, res, 400, "Cannot get a refreshed token");
    }
}

module.exports = {
    auth,
    getToken,
    refreshToken
};