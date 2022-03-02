//This is setting button to our submit button on our HTML page
var button = document.getElementById('submit');
//Stores all the neccesary information when the submit button is clicked
window.addEventListener('click', async function(event){
    //Next couple of line will keep track of which radio button is selected
    var media = "";
    if(document.getElementById('song').checked) {
        media = "song";
        }
    else if(document.getElementById('album').checked){
        media = "album";
    }
    else{
        media = "lyric";
    }
    //This is going to combine all the input we need and send a request to the server
    var name = document.getElementById('input').value;
    var endpoint_url = 'http://127.0.0.1:8090/' + media +'/' + name;
    try{
        let response = await fetch(endpoint_url);
        let body = await response.text();
        document.getElementById('content').innerHTML = body;
    }catch(e){
        alert(e);
    }
});