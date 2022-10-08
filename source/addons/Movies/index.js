const {Router} = require("express");
const MovieRouter = Router();


MovieRouter.get("/", (req, res) => {
    return res.json([{
        name: "Movies",
        type: "addon_folder",
        path: "/addons/movies/files",
        before: "/api/directory",
        source: "addon"
    }])
})

const Movies = [
    {
        url: "https://www.fembed.com/v/kjz-wb3x5qkwypl",
        fembed: true,
        name: "Kirito Movie",
        type: "addon_folder"
    },{
	name: "Serie Kawaii",
    fembed: true,
    type: "addon_folder",
	url:  "https://vanfem.com/v/djpw1bxz22xkwgw"
    }	
]


MovieRouter.get("/files", (req, res) => {
    return res.json(Movies.map(movie => {
        return {
            type: movie.type,
            name: movie.name,
            before: "/addons/movies",
            path: movie.fembed ? "/addons/fembed/GetVideoSource/" +  movie.url.split("/v/")[1] : "/addons/proxy?url=" + movie.url
        }
    }))
})

MovieRouter.post("/file", (req, res) => {
    console.log(req.body);
    const { name, url, fembed } = req.body;
    if(!name || !url){
        return res.status(400).json({message: "Not filled all values!"});
    } 
    
    if(fembed){
        Movies.push({
            fembed,
            name,
            url,
            type: "addon_folder"
        })
        return res.status(200)
    }

    Movies.push({
        fembed: false,
        name,
        url,
        type: "addon_video"
    })

    return res.status(200)
})
module.exports =  {
    name: "movies",
    description: "Online content for Fembed and pure MP4 videos",
    type: "addon_folder",
    router: MovieRouter,
    form: [
        {
            name: "Add movie",
            action: "/addons/movies/file",
            inputs: [{placeholder: "Name", type: "input", name: "name"}, {placeholder: "Video URL", type: "input", name: "url"}, {label: "Fembed Video", type: "checkbox", name: "fembed"}]
        }
    ],
    content: Movies
}
