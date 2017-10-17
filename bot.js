var inquirer = require("inquirer")

var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

var request = require('request');

var keys = require("./keys.js");

var client = new Twitter({
  consumer_key: 'mBvA1jlIVqVTeZZr3wQNWUtlu',
    consumer_secret: 'x2arSBOAjXzAP8oj8AJT9VUIsH5BuaWhaVPyPxhA9G5OxJcBV2',
    access_token_key: '284233839-gJ5SKrEFBiIky7U6lI2zZbrRKuA9oRXcGSm0ghVo',
    access_token_secret: '0xUEEJV3A6P6k8hoqkWsyZDjpEcMT3IWgv5Jcv2sY68Yx'

})
var songsKey = new Spotify({
  id: "9d5df4ee4e284bfb86be4f10f371eb57",
  secret: "e6c04e886d3f4e08bc62f1e30d76131f"
});

function beginBot() {
inquirer
  .prompt([
  {
    type: "list",
    message: "what would you like to do?",
    choices: ["peep dem tweets", "hear those slaps", "check those flicks", "leave"],
    name: "userChoice"
  }
  ]).then(function(response){
    if (response.userChoice === "peep dem tweets") {
      tweets();
    }
    if (response.userChoice === "hear those slaps") {
      spotify();
    }
    if (response.userChoice === "check those flicks") {
      omdb();
    }
    if (response.userChoice === "leave") {
      process.exit();
    }
  })
}
function spotify() {
 inquirer.prompt([
  {
    type: "input",
    message: "which song would you like to search?",
    name: "songChoice"
  }
 ]).then(function(findSong){
    songsKey.search({ type: 'track', query: findSong.songChoice}, function(err, data){
      console.log("Song name: " + data.tracks.items[0].album.name);
      console.log("Artist name: " + data.tracks.items[0].artists[0].name);
      console.log("Link: " + data.tracks.items[0].href);
      console.log("Album name: " + data.tracks.items[0].name);
      beginBot();
    });
  })
}
function tweets(){
  inquirer.prompt([
  {
    type: "list",
    message: "who's tweets you peeping??",
    choices: ["liluzivert", "trvisXX", "OfficialKanye", "Four_Pins"],
    name: "twitHandle"
  } 
  ]).then(function(tweetSearch) {
    var params = {screen_name: tweetSearch.twitHandle};
    client.get("statuses/user_timeline", params, function(err, tweet, response){
      if(!err) {
        for (var i = 0; i < 20; i++) {
          console.log(i + ") ")
          console.log(tweet[i].text);
          console.log(tweet[i].created_at);
        }
      beginBot();
      }
    })
  })
  
}
function omdb(){
  inquirer.prompt([
    {
      type: "input",
      name: "findMovie",
      message: "what movie did you want to know about?"
    }
  ]).then(function(movieSearch){
    var lookUp = movieSearch.findMovie;
    var movieURL = "http://www.omdbapi.com/?t=" + lookUp + "&y=&plot=short&apikey=40e9cece";

    request(movieURL, function(err, response, body) {
      if (!err) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("R. Tomatos Rating: " + JSON.parse(body).Ratings);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Starring: " + JSON.parse(body).Actors);
        console.log("Plot: " + JSON.parse(body).Plot);
        beginBot();
      }
    })
  })
  
}
beginBot();