const Fembed = require("../addons/Fembed/index");
const Movies = require("../addons/Movies/index");
const addons = [Fembed, Movies];

const {Router} = require("express");
const AddonRouter = Router();

AddonRouter.get("/", (req, res) => {
    const response = []
    addons.forEach(e => {
        if(e.type === "API"){
            return;
        }
        response.push({
            name: e.name,
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