var $ = new Fetch().$;
var dkm = $('#darkmode');

function m(){
    var dark = localStorage.getItem('dark')
        if(dark){
            dkm.checked = true;
            document.body.classList.toggle("dark")
        }
    
}
m()
    


dkm.addEventListener("change", function(event){
    document.body.classList.toggle("dark")
    var dark = localStorage.getItem('dark')
    if(!dark){
        localStorage.setItem('dark', 'true')
    }else{
        localStorage.removeItem('dark')
    }
})