const {Router} = require("express");
const MovieRouter = Router();


MovieRouter.get("/", (req, res) => {
    return res.json([{
        name: "Movies",
        type: "addon_folder",
        path: "/addons/movies/files",
        source: "addon"
    }])
})

const Movies = [
    {
        url: "https://www.fembed.com/v/kjz-wb3x5qkwypl",
        name: "Kirito Movie"
    },{
	name: "Serie Kawaii",
	url:  "https://vanfem.com/v/djpw1bxz22xkwgw"
    }	
]


MovieRouter.get("/files", (req, res) => {
    return res.json(Movies.map(movie => {
        return {
            type: "addon_folder",
            name: movie.name,
            path: "/addons/fembed/GetVideoSource/" +  movie.url.split("/v/")[1]
        }
    }))
})


module.exports =  {
    name: "movies",
    description: "Movie Watcher for Fembed",
    type: "addon_folder",
    router: MovieRouter
}
