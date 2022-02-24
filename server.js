var express = require('express')

var app = express()

data = JSON.parse.(taylor_swift_lyrics.json)
app.use(express.static('client'))


app.get('/', function(req, resp){
    resp.send('This is the default page.')
})

app.get('/test', function(req, resp){
    resp.send('Test function worked')
})

app.get('/:user/:media', function(req, resp){
    let user = req.params['user']
    let media = req.params['media']
    let album = data['media']
    resp.send(album)
})
app.listen(8090)