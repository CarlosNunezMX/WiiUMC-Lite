function Fetch(){

    
}
/**
 * 
 * @param {string} selector 
 * @returns {HTMLElement}
 */
Fetch.prototype.$ = function(selector) {return document.querySelector(selector)}
Fetch.prototype.get = function(url, object, callback){
    var json = object.json
    var xhr = new XMLHttpRequest()
    xhr.open('get', url);

    if(json){
        xhr.onload = function(){
            var Json = JSON.parse(xhr.response);

            return callback(Json, url);
        }
    }
    else{
        xhr.onload = callback;
    }

    xhr.send()
}


Fetch.prototype.endPoints = {
    directorys: "/api/directory/",
    files: '/api/file',
    addons: "/addons/" 
}
