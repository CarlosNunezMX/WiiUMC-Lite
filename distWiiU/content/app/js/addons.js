var fetcher = new Fetch();
window.onload = function (event) {
    fetcher.get(fetcher.endPoints.addons, { json: true }, onAddonsSettings)
}
/**
 * @typedef {Object} input
 * @property {string} name
 * @property {string} placeholder?
 * @property {"input" | "checkbox"} type
 * @property {string} label?
 */

/** 
 * @typedef {Object} Addon
 * @property {string} name
 * @property {string} description
 * @property {string} path
 * @property {{name: string, action: string, inputs: input[]}[]} forms
*/
/**
 * 
 * @param {SubmitEvent} event 
 */
function onSubmit(event){
    e.preventDefault(); //This will prevent the default click action
    e.stopPropagation();
    console.log(this);

    console.log(frm);
}

/**
 * 
 * @param {Addon} addon Addon
 * @returns 
 */
function addOnPresset(addon) {
    var inner = '<div class="card">'
    inner += '<div class="card-content">' +
        '<h5 class="card-title">' + addon.name +
        '</h5><p class="card-text">' + addon.description + '</p>' +
        ' <ul class="list-group list-group-flush">'

    for (var x = 0; x < addon.forms.length; x++) {
        var form = addon.forms[x];
        inner += '<li class="list-group-item">' +
            '<div class="row"> <h6>' + form.name + '</h6> </div>'

            inner += '<div class="row">'+
            '<form class="col s12" onsubmit="onSubmit" action="' + form.action + '" method="POST">'
 
            for (var z = 0; z < form.inputs.length; z++) {
            var input = form.inputs[z];
            if (input.type === "input") {
                inner += '<div class="row">'+
                '<div class="input-field col s12">'+
                '<input type="text" id="'+input.name + form.name.replace(" ", "") +'" name="'+ input.name +'">' + 
                    '<label for="'+input.name + form.name.replace(" ", "") +'">' + input.name + '</label>' +
                '</div></div>'
            }
            else if(input.type === "checkbox"){
                inner += '<p>' +
                '<label>' +
                  '<input name="'+ input.name +'" type="checkbox" />' +
                  '<span>'+ input.label+'</span>' +
                '</label>' +
              '</p>'
            }

        }
        inner += '<div class="d-grid gap-2"><button onclick="onSubmit(event)" class="btn btn-primary" type="submit"> Add</button></div>'+ 
        "</form></div>"

        inner += '</li>'
    }
    // Comprove if has form
    inner += '  </ul></div></div>';
    return inner
}
var addon_settings = fetcher.$("#addonsSettings");
function onAddonsSettings(addons) {
    for (var i = 0; i < addons.length; i++) {
        const addon = addons[i];
        addon_settings.innerHTML = addOnPresset(addon)
    }
}