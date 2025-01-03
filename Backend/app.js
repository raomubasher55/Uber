const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const ApiError = require('./utils/ApiError');
const { default: status } = require("http-status");
const errorHandler = require('./middlewares/errorHandler.middleware');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('Hello world');
});



app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


// 404 Not Found error handler
app.use((req, res, next) => {
    next(new ApiError(status.NOT_FOUND, 'Route  Not found'));
});


app.use(errorHandler); 


module.exports = app;
