require("dotenv").config();

const config = {
    spotifyAccountsUrl: process.env.SPOTIFY_ACCOUNTS_URL,
    spotifyAccountsScopes: process.env.SPOTIFY_ACCOUNTS_SCOPES,
    corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN,
    databaseUrl: process.env.DATABASE_URL,
    redirect_url: process.env.REDIRECT_URL,
    redirect_client_url: process.env.REDIRECT_CLIENT_URL,
    port: process.env.PORT
}

module.exports = { 
    config
};

