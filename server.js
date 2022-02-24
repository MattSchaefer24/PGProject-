var express = require('express')

var app = express()

app.use(express.static('client'))


app.get('/', function(req, resp){
    resp.send('This is the default page.')
})

app.get('/test', function(req, resp){
    resp.send('Test function worked')
})

app.listen(8090)