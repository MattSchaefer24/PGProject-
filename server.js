var express = require('express')

var app = express()

var taylor = require('./client/taylor_swift_lyrics.json')

app.get('/test', function(req, resp){
    resp.send('Test function worked')
})

app.get('/:media/:name', function(req, resp){
    var media = req.params['media']
    var name = req.params['name'].toLowerCase
    console.log(name)
    var response = ''
    if(media = 'song'){
        for(i =1; i<4862; i++){
            if(taylor[i]['track_title'].toLowerCase == name){
                response += (taylor[i]['lyric'])
            }
            else{
                alert('This is not a Taylor Swift song.')
            }
        }

    }
    console.log(response)
})
app.listen(8090)