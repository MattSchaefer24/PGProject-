//This is setting button to our submit button on our HTML page
var button = document.getElementById('submit');

//Waiting for a response from the server when a request is submitted
async function(event){
    event.preventDefault()
    console.log('Surprise')
    try{
        let response = await fetch('http://127.0.0.1:8090/new');
        let body = response.text();
        document.getElementById('content').innerHTML = body;
    }
    catch(e){
        alert(e)
    }
}