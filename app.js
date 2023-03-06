const express = require("express");
const userRoute = require("./routes/authRoute");
const authRoute = require("./routes/authRoute");
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
})

app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/auth", authRoute);


app.use((error, req, res, next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data})
})

const MONGODB_URI = "mongodb+srv://dakingzman:physics123@cluster0.twljaiu.mongodb.net/test"
// const store = new MongoDBStore({
//     uri: MONGODB_URI,
//     collection: 'sessions'
// });

// app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}))
// app.use(flash());


// app.use((req, res, next) => {
//     User.findById("63fed67c0a09669f3b8f8249")
//         .then((user) => {
//             req.user = user;
//             next();
//         })
//         .catch((err) => console.log(err));
// });

console.log("reg");
mongoose
    .connect(
        MONGODB_URI
    )
    .then((result) => {
        // console.log(result)
        // User.findOne().then((user) => {
        //     if (!user) {
        //         const user = new User({
        //             email: "kingsley@gmail.com",
        //             password: "kingsley123",
        //         });
        //         user.save();
        //     }
        // });
        app.listen(7000, () => {
            console.log("app is listenng on port: 7000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
