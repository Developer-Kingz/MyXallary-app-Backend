const express = require("express");
const userRoute = require("./routes/authRoute");
const authRoute = require("./routes/authRoute");
const applicationRoute = require('./routes/applicationRoute')
const mongoose = require("mongoose");
const User = require("./models/user");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json()); //application/json

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/auth", applicationRoute);


app.use((error, req, res, next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
})

const MONGODB_URI = "mongodb+srv://dakingzman:physics123@cluster0.twljaiu.mongodb.net/test"

console.log("reg");
mongoose
    .connect(
        MONGODB_URI
    )
    .then((result) => {
        app.listen(7000, () => {
            console.log("app is listenng on port: 7000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
