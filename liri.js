require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js")


// Create an empty variable for holding the movie name
// var movieName = "";


// Store all of the arguments in an array
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

// make into switches
function run() {
  switch (command) {

  case "concert-this":
    console.log("concert-this");
    concert(input);
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
    dowhat(input);
    break;

  default:
    console.log("Invalid command.")
}
}
run()

//movie-this:
function movie(movieName) {
  // Then run a request with axios to the OMDB API with the movie specified 
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  if (!movieName) {
    movieName = 'Mr Nobody';
    console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
    console.log("It's on Netflix!");
  } else {
    // console.log(queryUrl);
    axios.get(queryUrl).then(
      function (response) {
        console.log("Movie Title: " + response.data.Title);
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
}


//spotify-this-song:
function song(songName) {
  var spotify = new Spotify(keys.spotify);
  if (!songName) {
    songName = 'the sign Ace of Bass';
  } else {
    spotify.search({ type: 'track', query: songName, limit:1 }, function (err, data) {
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
        console.log("Preview Link: " + data.tracks.items[i].preview_url);
      }
    })
  }
}

//concert-this:

function concert(artist) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  console.log(queryUrl);
  axios.get(queryUrl).then(
    function (response) {
      //  for(var i =0; i < response.data.length; i++) {

      console.log("Venue: " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
      console.log("Date of Event: MM/DD/YYYY " + moment(response.data[0].datetime).format("L"));
    })
}



//create do what it says function //
function dowhat() {
  fs.readFile('random.txt', 'utf8', function(err, data) {
   console.log(data);   
   if (err)
  console.log(err);

  var dataArr = data.split(",");
  console.log(dataArr); 
  
  var dataArr2 = dataArr[1].split(" ");
  console.log(dataArr2);
  command = dataArr[0];
  input = dataArr[1];
    // console.log(input);
    // console.log(command);
    song(dataArr);
    run();


    })
  }
  

