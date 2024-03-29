const express = require("express");
const {readFiles} = require("./file.reader")
const morgan = require("morgan");
const { getLanguage } = require("./locales/locale");
const { APIRouter } = require("./api/router");
const addons = require("./api/addon.handler")
require("ejs")

const app = express();

app.set("view engine", "ejs");
app.set("views" , __dirname + "/views");
app.use(express.static(__dirname + "/public"))
app.use("/videos", express.static(__dirname + "/videos"))

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"));

app.use("/addons", addons.router);
app.use("/api", APIRouter)
app.get("/", getLanguage, (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})
app.get("/settings", getLanguage, (req, res) => {
    res.sendFile(__dirname + "/views/settings.html")
})
app.listen(3000 , () => console.log("Running on 3000"))
