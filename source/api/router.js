const {Router} = require("express");
const { readFiles } = require("../file.reader");
const { getLanguage } = require("../locales/locale");
const {existsSync} = require("fs")
const APIRouter = Router();


APIRouter.get("/directory", (req, res) => {
    let up = req.query.route
    if(!up){
        up = ""
    }

    return res.status(200).json({files: readFiles(up)});
})

APIRouter.get("/file", getLanguage, (req, res)=>{
    let up = req.query.route;

    if(!up){
        return res.status(404).json({error:req.lang.API.Message404});
    }
    if(!existsSync(up)){
        return res.status(404).json({error:req.lang.API.Message404});
    }
    else{
        return res.sendFile(up)
    }
})

module.exports = {APIRouter}