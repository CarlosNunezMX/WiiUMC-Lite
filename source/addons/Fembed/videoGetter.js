const fetch = require('node-fetch');

async function FembedgetData(id){
    const redirect = await fetch(`https://fembed.com/v/${id}`).then(res => res.url.replace("/v/", "/api/source/"))
    const video = await fetch(redirect, { method: "POST" }).then(res => res.json())
    if (!video["success"]) return { success: false }
    return video
}

function process(videoJSON){
    return videoJSON.data.map(video => {
        return {
            file: video.file,
            quality: video.label,
            type: video.type
        }
    })
}


module.exports = {
    fembed: FembedgetData
}