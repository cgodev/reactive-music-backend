// Packages
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

// Express
const express = require("express");

// Modules
const authApi = require("./routes/authApi");
const rooms = require("./routes/rooms");
const notFoundHandler = require("./utils/middlewares/notFoundHandler");

// Config
const { config } = require("./config/index");

// Initialize app
const app = express();

// Middlewares usage
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.disable("x-powered-by");

// Routes
authApi(app);
rooms(app);

// App middlewares
app.use(notFoundHandler);

// Start server
app.listen(config.port, () => {
    console.log(`Server listening on http://localhost:${config.port}/api`);
})