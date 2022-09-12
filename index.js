require("dotenv").config('./')
require('express-async-errors');
const express = require("express");
const userApiRouter=require('./src/routes/users.routes')
const cors =require("cors");
const notFound=require('./src/middleware/not-found')//
const errorHandlerMiddleware=require('./src/middleware/error-handler')//
const {connectDB} = require('./src/db/connect')
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
//configuring body parser(accepts key value from request and parses)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//setting middleware for router
app.use('/api',userApiRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)
const url=process.env.MONGO_URI

const port=process.env.PORT

const start = async () => {
    try {
        await connectDB(url);
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};


start();