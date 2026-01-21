const startServer = require("./config/db");
const PORT = 4545;

const express = require("express");
const cors = require("cors");

const authenticationRoute= require('./modules/authentication/authentication.route')
const authorRoute = require("./modules/author/author.route");
const bookRoute = require("./modules/book/book.route");
const commentRoute= require ("./modules/comment/comment.route")
const path = require("node:path");
const errorHandler= require ('./middlewares/errorHandler/errorHandler')
const passport= require('passport')
const session= require ('express-session');
const {initGooglePassport}= require ('./modules/oauth/google/google.config')
const googleRoute= require ('./modules/oauth/google/google.route')
const instagramRoute= require('./modules/oauth/instagram/insta.route');
const { initInstagramPassport } = require("./modules/oauth/instagram/insta.config");
const app = express();

//middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())
initGooglePassport()
initInstagramPassport()

//route
app.use("/",authenticationRoute)
app.use("/", authorRoute);
app.use("/", bookRoute);
app.use("/", commentRoute)
app.use("/",googleRoute)
app.use("/",instagramRoute)
app.use(errorHandler)

app.listen(4545, () => console.log("Server running on 4545"));
startServer(PORT, app);
