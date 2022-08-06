const fileReader = require("fs");
const path = require("path")
let videoPath = path.resolve(__dirname,"videos")
if(!fileReader.existsSync(videoPath)){
    fileReader.mkdirSync(videoPath)
}
/**
 *
 * @param {{route: string, out: boolean}} param0
 * @returns
 */
function parse({route, out}){
    if(out){
        let router = route.split("/");
        router = router.filter((value) => value !== "/").join("--")
        return router
    }else{
        let router = route.split("--");
        router = router.filter((value) => value !== "--").join("/")
        return router
    }
}
const readFiles = (scan) => {
    let dir;
    if(scan !== "/"){
        dir = path.resolve(videoPath, scan)
    }else{
        dir = videoPath
    }
    let files = fileReader.readdirSync(dir);
    let res = files.map((fileName)=>{
        let filePath = path.resolve(dir, fileName)
        let file = fileReader.statSync(filePath);
        if(file.isFile()){
            if(!filePath.endsWith(".mp4")){
                return {
                    name: fileName,
                    type: "file",
                    path: `${filePath.split("videos/")[1]}`
                }
            }
            return {
                name: fileName,
                type: "video",
                path: `${filePath.split("videos/")[1]}`
            }
        }else if(file.isDirectory()){
            return {
                name: fileName,
                type: "folder",
                path: `${filePath.split("videos/")[1]}`
            }
        }
    })
    console.log(res);
    return res
}

module.exports = {readFiles}
