function Fetch(){

    
}

Fetch.prototype.get = function(url,{json}, callback){
    var xhr = new XMLHttpRequest()
    xhr.open('get', url);

    if(json){
        xhr.onload = function(){
            var Json = JSON.parse(xhr.response);

            return callback(Json);
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
