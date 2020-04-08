'use strict';
require('dotenv').config();
const superagent = require('superagent');




app.get('/movies', (request, response) => {
    superagent(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIES_API_KEY}`)
      .then((res) => {
        const movieInfo = res.body.movieDatas.map((ourmovieData) => {
          return new Movies(ourmovieData);
        });
        response.status(200).json(movieInfo)
      })
      .catch((error) => errorHandler(error, request, response));
  });


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

  module.exports = moviePage;