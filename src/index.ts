// Packages
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from 'cors';
import path from "path";

// Express
import express from 'express'
// Database
const { dbConnection } = require("./database/index");

// Modules
import authApi from './routes/AuthApi'
import rooms from './routes/rooms'
import searchRouter from './routes/Search'
import users from './routes/users'
import credentials from './routes/userCredentials'
import genresSeeds from './routes/genresSeeds'
import notFoundHandler from './utils/middlewares/notFoundHandler'

// Config
import config from './config/index'

// Initialize app
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
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
searchRouter(app);


// App middlewares
app.use(notFoundHandler);

// Start server
app.listen(config.port || 5000);


export default app;