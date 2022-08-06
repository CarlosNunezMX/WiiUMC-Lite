const {Router} = require("express");
const { readFiles } = require("../file.reader");
const { getLanguage } = require("../locales/locale");
const {existsSync} = require("fs")
const {resolve} = require('path')
const APIRouter = Router();
const addons = require("./addon.handler");


APIRouter.get("/directory", (req, res) => {
    /**
     * @type {Array}
     */
    let up = req.query.route
    if(!up){
        up = ""
    }
    const response = []
    addons.addons.forEach(e => {
        if(e.type === "API"){
            return;
        }
        response.push({
            name: e.name,
            type: e.type,
            path: "/addons/" + e.name
        })
    });

    const final = readFiles(up).concat(response);
    return res.status(200).json( final);
})

APIRouter.get("/file", getLanguage, (req, res)=>{
    let up = req.query.route;
    up = resolve(__dirname , "../videos", up)
    console.log(up)
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