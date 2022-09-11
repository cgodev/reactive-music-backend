// Packages
const { Buffer } = require("buffer");
const axios = require("axios").default;
const qs = require("qs");
const moment = require("moment");

// Modules
const { success, error } = require("../utils/responses/Responses");

// Config
const { config } = require("../config/index");

class AuthController {
    baseUrl;
    clientId;
    clientSecret; 
    redirectUrl;
    responseType;
    grantType;

    constructor(){
        this.baseUrl = "https://accounts.spotify.com";
        this.clientId = config.client_id;
        this.clientSecret = config.client_secret;
        this.redirectUrl = config.redirect_url;
        this.responseType = "code";
        this.grantType = "authorization_code";
    }

    auth(req, res){
        const params = new URLSearchParams({
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            response_type: this.responseType,
        });
        
        res.redirect(this.baseUrl+"/authorize?"+params);
    }

    async getToken(req, res){
        const code = req.query.code || "";
        const token = Buffer.from(this.clientId + ":" + this.clientSecret).toString("base64");
        const body = {
            "grant_type": this.grantType,
            "redirect_uri": this.redirectUrl,
            "code": code
        };

        try {
            const { data, status } = await axios({
                method: "POST",
                url: this.baseUrl+"/api/token",
                data: qs.stringify(body),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${token}`,
                }
            });

            if(!data || status != 200){
                return error(req, res, 400, "Cannot get a token");
            }

            const { access_token, expires_in } = data;

            res.cookie("token", access_token, {
                maxAge: 1 * expires_in * 1000,
            });

            return success(req, res, 200, null, data);

        } catch (e) {
            return error(req, res, 400, "Cannot get a token");
        }
    }

    async refreshToken(){
        console.log("Refresh token function");
    }
}

module.exports = AuthController;