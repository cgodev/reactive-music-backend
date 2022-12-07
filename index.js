// Packages
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

// Express
const express = require("express");

// Database
const { dbConnection } = require("./database/index");

// Modules
const authApi = require("./routes/AuthApi");
const rooms = require("./routes/rooms");
const users = require("./routes/users");
const credentials = require("./routes/userCredentials")
const genresSeeds = require("./routes/genresSeeds");
const notFoundHandler = require("./utils/middlewares/notFoundHandler");

// Config
const { config } = require("./config/index");

// Initialize app
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

// Middlewares usage
app.use(cors({
    credentials: true,
    origin: config.corsAllowOrigin
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable("x-powered-by");

// Database
dbConnection();

// Routes
authApi(app);
rooms(app);
genresSeeds(app);
users(app);
credentials(app);


// App middlewares
app.use(notFoundHandler);

// Start server
app.listen(config.port || 5000);



module.exports = app;