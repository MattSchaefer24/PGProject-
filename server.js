//Setting up express and our static file to manage CORS policy
var express = require('express')
var app = express()
app.use(express.static('client'))


app.use(express.static('client'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Loading in our JSON data
var taylor = require('./client/taylor_swift_lyrics.json')


//Going to make an array with the names of all the songs and albums 
var songs = []
var albums = []
var lyrics = []


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
    lyrics.push(taylor[keys]['lyric'].toLowerCase())
}


//Action of the form gets sent to this request 
app.post('/new', function(req, resp){
    console.log("Got request")
    var name = req.body.about.toLowerCase()
    var media = req.body.picker

    //If song is selected, need to verify that it is a Taylor Swift song 
    if(media == 'song'){
        var index = songs.indexOf(name)
        if(index == -1){
            song_lryics = ""
            resp.send('This is not a swift song,')
        }

        //If the song is Taylor Swift then we want to fetch the lyrics 
        else{
            song_lyrics = ""
            for(var keys in taylor){
                if(taylor[keys]['track_title'].toLowerCase() == name){
                    song_lyrics += taylor[keys]['lyric']
                    song_lyrics += '\n'
                }
            }
            resp.send(song_lyrics)
        }
    }

})

//Managing a get request 
app.get('/:media/:name', function(req, resp){
    song_lyrics = ''
    var media = req.params['media']
    var name = req.params['name'].toLowerCase()
    //If song is selected, need to verify that it is a Taylor Swift song 
    if(media == 'song'){
        var index = songs.indexOf(name)
        if(index == -1){
            song_lryics = ""
            resp.send('This is not a swift song,')
        }
        
    //If the song is Taylor Swift then we want to fetch the lyrics 
        else{
            song_lyrics = ""
            for(var keys in taylor){
                if(taylor[keys]['track_title'].toLowerCase() == name){
                    song_lyrics += taylor[keys]['lyric']
                    song_lyrics += '\n'
                }
            }
            resp.send(song_lyrics)
        }
    }

    //If searching for a song by a lyric, need to verify whether it is a Swift lyric 
    else if(media == 'lyric'){
        index = lyrics.indexOf(name);
        if(index == -1){
            resp.send('That lyric is not found in any Taylor Swift song');
        }

        //If it is a swift lyric, then need to fetch what ever song it was from
        else{ 
            for(var keys in taylor){
                if(taylor[keys]['lyric'].toLowerCase() == name){
                    var song = taylor[keys]['track_title'];
                }
            }
            resp.send(song);
        }
    }
    //If searching for all the songs in an album, need to verify that it is a swift album  
    else if(media == 'album'){
        index = albums.indexOf(name)
        if(index == -1){
            resp.send("This is not a Taylor Swift album. ")
        }
        

        //If it is a Taylor Swift Album then need to return all the songs on that album
        else{
            songs = []
            for(var keys in taylor){
                if(taylor[keys]['album'.toLowerCase()] == name){
                    index = songs.indexOf(taylor[keys]['track_title']);
                    if(index == -1){
                        songs.push(taylor[keys]['track_title']);
                    }
                }
            }
            resp.send(songs)
        }
    }
})

app.listen(8090);