require("dotenv").config();

const config = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    spotifyAccountsUrl: process.env.SPOTIFY_ACCOUNTS_URL,
    spotifyAccountsScopes: process.env.SPOTIFY_ACCOUNTS_SCOPES,
    databaseUrl: process.env.DATABASE_URL,
    redirect_url: process.env.REDIRECT_URL,
    port: process.env.PORT
}

module.exports = { 
    config
};

