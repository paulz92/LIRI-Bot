## LIRI-Bot
A simple, easy to use, command line Node app for users to request a series of tweets, info about a song, or info about a movie by using only command line inputs.

## Tech/framework used
<b>Built with</b>
- Node JS
- JavaScript
- NPM packages: [node-spotify-api](https://www.npmjs.com/package/node-spotify-api), [request](https://www.npmjs.com/package/request), [twitter](https://www.npmjs.com/package/twitter)

## API Reference
<b>APIs used</b>
- Twitter [Get statuses/user_timeline](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline.html)
- [Spotify Web API](https://developer.spotify.com/web-api/)
- [OMDB API](http://www.omdbapi.com/)

## Installation
- Install [Node js](https://nodejs.org/en/)
- Clone the LIRI-Bot repository to your machine
- While inside the cloned repository, run the following to install the npm package dependencies 

		npm install

- You're ready to go!

## How to use?
After the installation is complete, usage is as follows:
	
- Tweets

		node liri.js my-tweets

- Songs

		node liri.js spotify-this-song <song name here>

- Movies

		node liri.js movie-this <movie name here>

- Do What It Says

		node liri.js do-what-it-says

## Features
- my-tweets will return the last 20 tweets from [trippy__Zebra](https://twitter.com/trippy__Zebra)
- spotify-this-song will return artist, song, and album data along with the url for a song preview if available
- movie-this will return the movie's title, year, IMDB and Rotten Tomatoes ratings, country, language, plot, and actors
- do-what-it-says will run the text in the random.txt file and search appropriately
- all commands input and responses will be logged in the log.txt file in the repo
- if a user misspells or doesn't input a command, they will be notified
- if a user doesn't enter a song or movie to search, they will be notified and a default song or movie will populate
- if any errors are captured, they will be displayed to the user

## Credits
UNC Chapel Hill Coding Boot Camp

© [paul92](https://github.com/paulz92)