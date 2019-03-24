require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");

//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js")


// Create an empty variable for holding the movie name
var movieName = "";


// Store all of the arguments in an array
var nodeArgs = process.argv[2];
var input = process.argv[3];

// make into switches
switch (nodeArgs) {

  case "concert-this":
    console.log("concert-this");
    //call the function for "concert" function 
    break;

  case "spotify-this-song":
    console.log("spotify-this-song");
    song(input);
    break;

  case "movie-this":
    console.log("movie-this");
    movie(input);
    break;

  case "do-what-it-says":
    console.log("do-what-it-says");
    //call the function for "do what it says" function
    break;

  default:
    console.log("Invalid command.")
}



function movie(movieName) {
  // Then run a request with axios to the OMDB API with the movie specified 
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  if (!movieName) {
    movieName = "Mr Nobody";
  console.log(queryUrl);
  axios.get(queryUrl).then(
    function (response) {
      console.log("Movie Title:" + response.data.Title);
      console.log("Movie Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Starring: " + response.data.Actors);
    }
  );
}


function song(songName) {
  var spotify = new Spotify(keys.spotify);
  if (!songName) {
    songName = "the sign";
  }
  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // loop for multiple results
    var condition = data.tracks.items.length
    for (var i = 0; i < condition; i++) {
      if (i >= 5) {
        return true;
      }
      console.log("===================================================================");
      console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
      console.log("Album Name: " + data.tracks.items[i].album.name);
      console.log("Song Name: " + data.tracks.items[i].name);
      console.log("Preview Link: " + data.tracks.items[i].album.external_urls.spotify);
    }
  }
});
