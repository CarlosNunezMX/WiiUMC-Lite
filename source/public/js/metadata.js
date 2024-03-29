function parseMeta(metadata){
    metadata.description = metadata.description ? metadata.description : "Not description here!";
    var inner = '<div class="row">' +
    '<div class="col s3">' 
    if(metadata.type === "addon_folder"){
        inner += '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="40%" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16"><path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/></svg>'
    }else if(metadata.type === "video" || metadata.type === "addon_video"){
        inner += '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="40%" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/></svg>'
    }
    inner += '</div>'
    inner += '<div class="col s9">'
    inner += "<h4>"+ metadata.name +"</h4>";
    inner += '<p>'+ 
        '<span><b>Type: </b>' + metadata.type + '</span><br/>' +
        '<span><b>Description: </b>' + metadata.description+ '</span><br/>' 
    + '<p>'
    return inner;
}


/**
 * +++++ Name {}
 * +++++ Type {}
 * +++++ Description {}
 */