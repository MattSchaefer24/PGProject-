var button = document.getElementById('submit')

button.addEventListener('click', async function(event){
    var endpoint = document.getElementById('input').value
    let endpoint_url = 'http://127.0.0.1:8090/' + endpoint
    try{
        let response = await fetch(endpoint_url)
        let body = await response.text()
        document.getElementById('content').innerHTML = body
    }catch(e){
        alert(e)
    }
})