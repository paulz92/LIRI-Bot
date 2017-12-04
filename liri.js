// saving required files/npm packages as variables
var tweetKeys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// saving twitter keys as variables
var consumerKey = tweetKeys.consumer_key;
var consumerKeySecret = tweetKeys.consumer_secret;
var accessTokenKey = tweetKeys.access_token_key;
var accessTokenKeySecret = tweetKeys.access_token_secret;

// saving user input command
var command = process.argv[2];

// saving user input song or movie
var nodeArgs = process.argv;
var movieOrSong = "";
// starting at position 3 in node args array, build the movie/song string
for (var i = 3; i < nodeArgs.length; i++) {
	// for all args that aren't position 3, add a + to existing movie/song
	// then the next arg (all words after first word in movie or song title)
	if (i > 3 && i < nodeArgs.length) {
		movieOrSong = movieOrSong + "+" + nodeArgs[i];
		// for arg at position 3, just add the arg with no + before it (first word in
		// movie or song title)
	} else {
		movieOrSong += nodeArgs[i];
  }
}

// switch case to run the appropriate function based on the user's command
switch (command) {
	case "my-tweets":
		myTweets();
		break;
	case "spotify-this-song":
		spotifyThisSong();
		break;
	case "movie-this":
		movieThis();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
}

// function if user asks for tweets
function myTweets() {
	console.log(command + ". tweets, success");
}

// function if user asks for spotify
function spotifyThisSong() {
	console.log(command + ". spotify, success");
	console.log(movieOrSong + ". song, success");
}

// function if user asks for movies
function movieThis() {
	console.log(command + ". movies, success");
	console.log(movieOrSong + ". movie, success");
}

// function if user asks for do what it says
function doWhatItSays() {
	console.log(command + ". do what it says, success");
}