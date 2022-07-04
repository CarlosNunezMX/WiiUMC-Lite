/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const fs = require("fs");
const path = require("path");

function getLanguage(req, res, next){
    const Lang = req.headers["accept-language"];
    console.log(Lang);
    let PathEN = path.resolve(__dirname, "en.json")
    if(!Lang){
        req.lang = JSON.parse(fs.readFileSync(PathEN, {encoding: "utf-8"}));
    }else{
        let removeGuion = Lang.split("-")[0];
        console.log(removeGuion);
        let Path = path.resolve(__dirname, `${removeGuion}.json`);
        if(fs.existsSync(Path)){
            console.log(Path)
            req.lang = JSON.parse(fs.readFileSync(Path, {encoding: "utf-8"}));
        }

        else{req.lang = JSON.parse(fs.readFileSync(PathEN, {encoding: "utf-8"}));}
    }

    next()
}

module.exports ={getLanguage}