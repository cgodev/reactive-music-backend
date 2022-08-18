// Packages
const { Buffer } = require("buffer");
const axios = require("axios").default;

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

    // Problem is here, this is undefined, why?
    auth(req, res){
        console.log(this); // -> returns undefined
        const params = new URLSearchParams({
            // These properties cannot be accesed
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            response_type: this.responseType,
        });
        
        res.redirect(this.baseUrl+"/authorize?"+params);
    }

    async signIn(req, res){
        const code = req.query.code;
        const token = Buffer.from(client_id + ':' + client_secret).toString('base64');
        const data = new URLSearchParams({
            grant_type: this.grantType,
            redirect_uri: this.redirectUrl,
            code
        }).toString();

        if(req.cookies.token){
            return success(req, res, 200);
        }

        try {
            const response = await axios({
                method: "POST",
                url: this.baseUrl+"api/token",
                data,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${token}`,
                }
            });

            return success(req, res, 200, null, response);

        } catch (e) {
            error(req, res, 400, "Cannot get a token");
        }
    }
    
}

module.exports = AuthController;


// app.get("/", (req, res) => {
//     res.redirect("https://accounts.spotify.com/authorize?"+params);
// });

// app.get("/callback", (req, res) => {
//     const client_id = "ca890419dc664ad8b7050e053400ce9a";
//     const client_secret = "5cf68048daef43c68d0c4fd3f1cfbb46";
//     const redirect_uri = "http://localhost:8000/home";
//     const auth = Buffer.from(client_id + ':' + client_secret).toString('base64');
//     const code = req.query.code;

//     if(!req.cookies.token){
//         request.post("https://accounts.spotify.com/api/token", {
//             method: "POST",
//             body: new URLSearchParams({
//                 redirect_uri,
//                 "grant_type": "authorization_code",
//                 "code": code
//             }).toString(),
//             headers: {
//                 "content-type": "application/x-www-form-urlencoded",
//                 "Authorization": `Basic ${auth}`,
//             },
//             withCredentials: true,
//         }, (e, response, body) => {
//             const parsed = JSON.parse(body);
//             const access_token = parsed.access_token;
//             return res.cookie("token", access_token, { httpOnly: false }).sendFile("views/layouts/home.html", { root: __dirname });
//         });
//     } else {
//         return res.sendFile("views/layouts/home.html", { root: __dirname });
//     }
// });
