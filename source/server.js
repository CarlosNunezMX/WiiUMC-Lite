const express = require("express");
const {readFiles} = require("./file.reader")
const morgan = require("morgan");
const { getLanguage } = require("./locales/locale");
require("ejs")

const app = express();

app.set("view engine", "ejs");
app.set("views" , __dirname + "/views");

app.use(express.static(__dirname + "/public"))
app.use("/videos", express.static(__dirname + "/videos"))
app.use(morgan("dev"));

app.get("/", getLanguage, (req, res) => {
    let up = req.query.route
    if(!up){
        up = ""
    }

    let type = req.query.type || "folder";
    let name = req.query.name || "Raiz"
    if(type === "mp4"){
        return res.render("view", {video: up, name});
    }

    res.render("files", {
        lang: req.lang,
        files: readFiles(up)
    })
})



app.listen(3000 , () => console.log("Running on 3000"))
