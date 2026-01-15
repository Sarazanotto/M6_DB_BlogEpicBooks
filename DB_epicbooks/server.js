const startServer = require("./config/db");
const PORT = 4545;

const express = require("express");
const cors = require("cors");

const authorRoute = require("./modules/author/author.route");
const bookRoute = require("./modules/book/book.route");
const commentRoute= require ("./modules/comment/comment.route")
const path = require("node:path");
const errorHandler= require ('./middlewares/errorHandler/errorHandler')
const app = express();

//middleware
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(cors());
app.use(express.json());

//route
app.use("/", authorRoute);
app.use("/", bookRoute);
app.use("/", commentRoute)


app.use(errorHandler)

app.listen(4545, () => console.log("Server running on 4545"));
startServer(PORT, app);
