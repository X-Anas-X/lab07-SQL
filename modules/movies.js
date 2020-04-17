'use strict';
require('dotenv').config();
const superagent = require('superagent');




function movieHandler (request, response){
  superagent(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIES_API_KEY}&query=${request.query.search_query}`)
    .then((res) => {
      const movieInfo = res.body.movieDatas.map((ourmovieData) => {
        return new Movies(ourmovieData);
      });
      response.status(200).json(movieInfo)
    })
    .catch((error) => errorHandler(error, request, response));
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

function Movies(movieData) {
  this.title = movieData.title;
  this.overview = movieData.overview;
  this.average_votes = movieData.average_votes;
  this.total_votes = movieData.total_votes;
  this.summary = movieData.summary;
  this.image_url = movieData.image_url;
  this.popularity = movieData.popularity;
  this.released_on = movieData.released_on;
}

module.exports = movieHandler;
