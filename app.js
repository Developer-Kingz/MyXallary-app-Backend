const express = require("express");
const error = require("express-async-errors");
const env = require("dotenv").config();
const path = require("path");
const userRoute = require("./routes/authRoute");
const authRoute = require("./routes/authRoute");
const jobRoute = require("./routes/jobRoute");
const mongoose = require("mongoose");
const User = require("./models/user");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const multer = require("multer");
const Job = require("./models/job");

const app = express();


app.use(bodyParser.json()); //application/json
//app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Method",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/auth", jobRoute);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname)
    }
  });

  const upload = multer({ storage: storage });
  app.post('/job', upload.single('image'), async (req, res) => {
    const newJob =  await Job.create({
        imageUrl: req.file.filename,
        company: req.body.company,
        level: req.body.level,
        country: req.body.country,
        salary: req.body.salary,
        tags: req.body.tags,
        date: Date.now()
    })
    return res.status(200).json({newJob})
  });

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const MONGODB_URI =
    "mongodb+srv://dakingzman:physics123@cluster0.twljaiu.mongodb.net/test";

console.log("reg");
mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        app.listen(7000, () => {
            console.log("app is listenng on port: 7000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
