//Setting up express and our static file to manage CORS policy
var express = require('express')
var app = express()
app.use(express.static('client'))

//Loading in our JSON data
var taylor = require('./client/taylor_swift_lyrics.json')

//Managing a get request 
app.get('/:media/:name', function(req, resp){
    var media = req.params['media']
    var name = req.params['name']
    resp.send(name)
})
app.listen(8090)
