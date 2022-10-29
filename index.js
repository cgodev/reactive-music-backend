// Packages
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

// Express
const express = require("express");

// Database
const { dbConnection } = require("./database/index");

// Modules
const authApi = require("./routes/authApi");
const rooms = require("./routes/rooms");
const users = require("./routes/users");
const credentials = require("./routes/userCredentials")
const genresSeeds = require("./routes/genresSeeds");
const notFoundHandler = require("./utils/middlewares/notFoundHandler");

// Config
const { config } = require("./config/index");

// Initialize app
const app = express();

// Middlewares usage
app.use(cors());
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
app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}/api`);
})