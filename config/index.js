require("dotenv").config();

const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_url: process.env.REDIRECT_URL,
    port: process.env.PORT
}

module.exports = { config };

