/**
 * 
 * @param {KeyboardEvent} event 
 */

var currentLocation = 0;
var beforeLocation;


function onKeyPress(event) {
    event.preventDefault()
    console.log(event.keyCode);
    if (event.keyCode == 38) {
        if (currentLocation > 0) {
            beforeLocation = currentLocation
            currentLocation--
        }
        move()


    } else if (event.keyCode == 40) {
        if (direct.content.length - 1 > currentLocation) {
            beforeLocation = currentLocation
            currentLocation++;
        }
        move()
    }
    if(event.keyCode === 37){
        fetcher.get(direct.before, {json: true}, onDirectorys);
    }
    if (event.keyCode == 13) {
        click(null, currentLocation)
        currentLocation = 0;
        beforeLocation = 0;
        if(direct.content[currentLocation].type === "video" || direct.content[currentLocation].type === "addon_video"){
            return
        }
        vid.innerHTML = parseMeta(direct.content[currentLocation])
        return;
    }

}

function move() {
    console.log([currentLocation, beforeLocation]);
    if(currentLocation < direct.content.length){
        var before = fetcher.$("#directory_" + String(beforeLocation));
        before.classList.remove("active");
    }


    var after = fetcher.$("#directory_" + String(currentLocation));
    after.classList.add("active")

    vid.innerHTML = parseMeta(direct.content[currentLocation])

}

window.onkeydown = onKeyPress