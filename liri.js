// saving required files/npm packages as variables
var tweetKeys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// saving twitter keys as variables per npm docs
var client = new twitter ({
	consumer_key: tweetKeys.consumer_key,
	consumer_secret: tweetKeys.consumer_secret,
	access_token_key: tweetKeys.access_token_key,
	access_token_secret: tweetKeys.access_token_secret
});

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
	// get statuses/user timeline for the alias screen name I created. max 20 tweets.
	// tweet mode extended so that the API doesn't truncate tweets over 140 characters
	client.get('statuses/user_timeline', 
	{screen_name: 'trippy__Zebra', count: '20', tweet_mode: 'extended'},
	function(error, tweets, response) {
		// looping through tweets object, console log the time stamp of tweet + tweet
		// followed by an empty line for aesthetics
		// looping in reverse order so oldest tweet is at top
		for (var i = tweets.length - 1; i >= 0; i--) {
			console.log(tweets[i].created_at + ": " + tweets[i].full_text + "\n");
		}
	});
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