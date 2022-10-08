const routerProxy = require("express").Router();
const fetch = require("node-fetch")

const getFetchHeader = async (headers) => {
    const data = {}
    for (let [key, value] of headers) {
        data[key] = value
    }
    return data
}

routerProxy.get("/", async (req, res) => {
    return await fetch(req.query.url, { headers: { range: req.headers.range } }).then(async response => {
        if (!response.ok) return res.status(404).json({ success: false })
        res.set(await getFetchHeader(response.headers))

        response.body.pipe(res.status(206))
        response.body.on('error', () => { })
    })
})

module.exports = {
	name: "proxy",
	description: "Proxy for online videos add-on",
	type: "API",
    router: routerProxy,
    form: {}
}	