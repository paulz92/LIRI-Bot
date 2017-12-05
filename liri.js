// saving required files/npm packages as variables
var appKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// npm twitter keys constructor
var client = new Twitter ({
	consumer_key: appKeys.twitterKeys.consumer_key,
	consumer_secret: appKeys.twitterKeys.consumer_secret,
	access_token_key: appKeys.twitterKeys.access_token_key,
	access_token_secret: appKeys.twitterKeys.access_token_secret
});

// npm spotify keys constructor
var spotify = new Spotify({
  id: appKeys.spotifyKeys.id,
  secret: appKeys.spotifyKeys.secret
});

// saving omdb api key
var omdbKey = appKeys.omdbKey.key;

// saving user input command
var command = process.argv[2];

// saving user input song or movie
var nodeArgs = process.argv;
var movieOrSong = "";
// starting at position 3 in node args array, build the movie/song string
for (var i = 3; i < nodeArgs.length; i++) {
	// for all args that aren't position 3, add a " " to existing movie/song
	// then the next arg (all words after first word in movie or song title)
	if (i > 3 && i < nodeArgs.length) {
		movieOrSong = movieOrSong + " " + nodeArgs[i];
		// for arg at position 3, just add the arg with no " " before it (first word in
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
	default:
		console.log("Please input a valid command." 
			+ " Options: my-tweets, spotify-this-song <song title here>," 
			+ " movie-this <movie title here>, or do-what-it-says.");
}

// function if user asks for tweets
function myTweets() {
	// get statuses/user timeline for the alias screen name I created. max 20 tweets.
	// tweet mode extended so that the API doesn't truncate tweets over 140 characters
	client
	.get('statuses/user_timeline', {screen_name: 'trippy__Zebra', count: '20', 
	tweet_mode: 'extended'}, function(err, tweets, response) {
		// if error, console log the error
		if (err) {
			return console.log("Error occurred: " + err);
		}
		// looping through tweets object, console log the time stamp of tweet + tweet
		// followed by an empty line for aesthetics
		// looping in reverse order so oldest tweet is at top
		for (var i = tweets.length - 1; i >= 0; i--) {
			console.log("\nOn " +	tweets[i].created_at + ", " + tweets[i].user.name 
				+ " tweeted: \n" + tweets[i].full_text);
		}
	});
}

// function if user asks for spotify
function spotifyThisSong() {
	// if user didn't input a song, default to The Sign by Ace of Base
	if (movieOrSong === "") {
		console.log("\nNo song input! That's ok, check this song out." 
			+ " Next time, type a song name after your spotify-this-song command.\n\n" 
			+ "Artist: Ace of Base\n" + "Song Title: The Sign\n" + "Album: The Sign\n" 
			+ "Preview URL: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236" 
			+ "dd0ae991882ff?cid=7bc14062ba5d492f9df0018efa9d9a03");
	} 
	// if user did input a song, run the following:
	else {
	  // get data for the song that the user input using npm package
		spotify
		.search({ type: 'track', query: movieOrSong, limit: 1 }, function(err, data) {
			// if error, return the error, otherwise, see below
	 		if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}

	  	// storing data.tracks.items[0] as it's needed to retrieve all relevant data
			var songData = data.tracks.items[0];
	  	// log the artist, song title, album
			console.log("\nArtist(s): " + songData.artists[0].name);
			console.log("Song Title: " + songData.name);
			console.log("Album: " + songData.album.name);
			// if spotify API returns null for preview, tell user no preview available,
			// otherwise provide the preview URL
			if (songData.preview_url === null) {
				console.log("No preview available for this song.");
			} else {
				console.log("Preview URL: " + songData.preview_url);
			}
		});
	}
}

// function if user asks for movies
function movieThis() {
	// if user didn't input a movie, default to Mr. Nobody
	if (movieOrSong === "") {
		console.log("\nNo movie input! That's ok, check this movie out." 
			+ " Next time, type a movie after your movie-this command.\n\n" 
			+ "Title: Mr. Nobody\n" + "Year: 2009\n" + "IMDB Rating: 7.9/10\n" 
			+ "Rotten Tomatoes Rating: 66%\n" 
			+ "Country: Belgium, Germany, Canada, France, USA, UK\n" 
			+ "Language: English, Mohawk\n" + "Plot: A boy stands on a station platform" 
			+ " as a train is about to leave. Should he go with his mother or stay with" 
			+ " his father? Infinite possibilities arise from this decision. As long as" 
			+ " he doesn't choose, anything is possible.\n" 
			+ "Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
		// if user did input a movie, run the following:
	} else {
		// building query url based around user input and my api key and saving it
		var queryURL = "http://www.omdbapi.com/?t=" + movieOrSong 
			+ "&y=&plot=short&apikey=" + omdbKey;

		request(queryURL, function(error, response, body) {
			// If no errors and the request is successful
  		if (!error && response.statusCode === 200) {
  			// parse through the body and log the relevant data for movie input
  			console.log("\nTitle: " + JSON.parse(body).Title);
  			console.log("Year: " + JSON.parse(body).Year);
  			console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
  			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
  			console.log("Country: " + JSON.parse(body).Country);
  			console.log("Language: " + JSON.parse(body).Language);
  			console.log("Plot: " + JSON.parse(body).Plot);
  			console.log("Actors: " + JSON.parse(body).Actors);
  		} 
  		// if the request wasn't successful, return the error
  		else {
  			return console.log("Error occurred: " + error);
  		}
		});
	}
}

// function if user asks for do what it says
function doWhatItSays() {
	console.log(command + ". do what it says, success");
}