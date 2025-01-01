const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/' , (req ,res)=>{
    res.send('Hello world')
});

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    // Handle other types of errors
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use('/users' , userRoutes);





// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });

module.exports = app;