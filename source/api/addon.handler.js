const Fembed = require("../addons/Fembed/index");
const Movies = require("../addons/Movies/index");
const proxy  = require("../addons/proxy/router")
const rokuAddon = require("../addons/roku/index")
const addons = [Fembed, Movies, proxy, rokuAddon];
const {Router} = require("express");
const AddonRouter = Router();
// 1520.706 1520.706
// Irozuku Sekai no Ashita kara
AddonRouter.get("/", (req, res) => {
    const response = []
    addons.forEach(e => {
        if(e.type === "API"){
            return;
        }
        response.push({
            name: e.name,
            description: e.description,
            forms: e.form,
            description: e.description,
            path: "/addons/" + e.name
        })
    });


    return res.json(response);
})

addons.map(addon => {
    AddonRouter.use("/" + addon.name, addon.router);
})

module.exports = {
    addons,
    router: AddonRouter
}