//Setting up express and our static file to manage CORS policy
var express = require('express')
var app = express()
app.use(express.static('client'))

//Loading in our JSON data
var taylor = require('./client/taylor_swift_lyrics.json')


//Going to make an array with the names of all the songs and albums 
var songs = []
var albums = []

for(var keys in taylor){
    //This block of code checks if the song name has already been pushed to the array 
    var check_song = songs.indexOf(taylor[keys]['track_title'].toLowerCase())
    if(check_song == -1){
        songs.push(taylor[keys]['track_title'].toLowerCase())
    }

    var check_album = albums.indexOf(taylor[keys]['album'])
    if(check_album == -1){
        albums.push(taylor[keys]['album'])
    }
}


//Managing a get request 
app.get('/:media/:name', function(req, resp){
    var media = req.params['media']
    var name = req.params['name'].toLowerCase()
    //If song is selected, need to verify that it is a Taylor Swift song 
    if(media == 'song'){
        var index = songs.indexOf(name)
        if(index == -1){
            console.log('This is not a Swift song. ')
        }
        else{
            lyrics = ""
            for(var keys in taylor){
                if(taylor[keys]['track_title'].toLowerCase() == name){
                    lyrics += taylor[keys]['lyric']
                }
            }
        }
        resp.send(lyrics)
    }
    
})

app.listen(8090)
