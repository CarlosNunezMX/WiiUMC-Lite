const { readFiles } = require("../../file.reader")
const Movies = require("../Movies/index")
const RSS_ROUTER = require("express").Router()
const { content } = require("../Movies/index")

async function generateRss(path = "/") {
    let files = await readFiles()
    const rss = {
        providerName: "WiiUMC - RokuWrapper",
        lastUpdated: new Date().getUTCDate(),
        language: "es-MX",
        movies: [],
        series: [],
    }

    files.forEach((file, i) => {
        const content = {
            title: file.name,
            releaseDate: new Date().toUTCString(),
            id: i,
            content: {
                videos: 	[{
                    url: "http://192.168.100.175:3000/api/file?route=" + file.path,
                    videoType:file.name.split(".")[file.name.split(".").length - 1],
                    quality: "HD" 
                }],
                streamFormat: file.name.split(".")[file.name.split(".").length - 1],
                duration: 3600.0
            },
            thumbnail: "https://th.bing.com/th/id/R.097cae74595a00befdbec89ffaaff6a0?rik=wevE%2biOFK%2bHzFA&riu=http%3a%2f%2fwww.hdwallpapers.in%2fdownload%2fcool_colors-wide.jpg&ehk=QJkc%2bTmWLlVV1jy6dmsWeVWUN0pujhIxqgzahLjatnM%3d&risl=&pid=ImgRaw&r=0",
            longDescription: "WiiUMC Wrapper for Roku",
            shortDescription: "WiiUMC Wrapper for Roku"
        }
        if (file.type === "video") {
            return rss.movies.push(content)
        } else if (file.type === "addon-folder" || file.type === "folder") {
            return rss.series.push(content)
        }
    })

    Movies.content.forEach((movie, i) => {
        const url = movie.fembed ? "/addons/fembed/max?id=" + movie.url.split("/v/")[1] : "/addons/proxy?url=" + movie.url;
        rss.movies.push({
            title: movie.name,
            releaseDate: new Date().toUTCString(),
            id: rss.movies.length + i + 1,
            content: {
                videos: [{
                    url: "http://192.168.100.175:3000" + url,
                    videoType: "mp4",
                    quality: "HD"
                }],
                streamFormat: "mp4",
                duration: 3600.0
            },
            thumbnail: "https://th.bing.com/th/id/R.097cae74595a00befdbec89ffaaff6a0?rik=wevE%2biOFK%2bHzFA&riu=http%3a%2f%2fwww.hdwallpapers.in%2fdownload%2fcool_colors-wide.jpg&ehk=QJkc%2bTmWLlVV1jy6dmsWeVWUN0pujhIxqgzahLjatnM%3d&risl=&pid=ImgRaw&r=0",
            longDescription: "WiiUMC Wrapper for Roku",
            shortDescription: "WiiUMC Wrapper for Roku"
        })
    })
    return rss;
}


RSS_ROUTER.get("/rss.json", async (req, res) => {
    res.json(await generateRss())
})

module.exports = {
    name: "roku",
    description: "Roku wrapper for RSS Channel",
    type: "API",
    router: RSS_ROUTER,
}
