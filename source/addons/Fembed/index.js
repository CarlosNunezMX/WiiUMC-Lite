const {Router} = require("express");
const { fembed } = require('./videoGetter');
const fembedRouter = Router();
const fetch = require("node-fetch")
const regex = /https\:\/\/fvs\.io\/redirector\?token\=.*/ // regex compile
fembedRouter.get("/GetVideoSource/:id", async (req, res) => {
    	const {id} = req.params
    	if(!id){
        	return res.status(404)
    	}	
        const sources = await fembed(id)
        
	return res.status(200).json(sources.data.map(e => ({
        type: "addon_video",
        path: "/addons/fembed/proxy?url=" + e.file,
        name: e.label
    })))
})
const getFetchHeader = async (headers) => {
    const data = {}
    for (let [key, value] of headers) {
        data[key] = value
    }
    return data
}

fembedRouter.get("/proxy", async (req, res) => {
    console.log(req.query);
    if(req.query.type === "image"){
        const url = req.query.file
        const response = await fetch(url)
        const buffer = await response.buffer()
        res.setHeader('Content-Type', response.headers.get('content-type'))
        return res.send(buffer)
    }

    if (!req.query.url || !(regex).test(req.query.url)) return res.status(404).json({ success: false })
    return await fetch(req.query.url, { headers: { range: req.headers.range } }).then(async response => {
        if (!response.ok) return res.status(404).json({ success: false })
        res.set(await getFetchHeader(response.headers))

        response.body.pipe(res.status(206))
        response.body.on('error', () => { })
    })
})


module.exports = {
	name: "fembed",
	description: "Fembed handler",
	type: "API",
    router: fembedRouter
}	