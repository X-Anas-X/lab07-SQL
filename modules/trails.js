'use strict';
require('dotenv').config();
const superagent = require('superagent');




function trailHandler (request, response) {
  superagent(`https://www.hikingproject.com/data/get-trails?lat=${request.query.latitude}&lon=${request.query.longitude}&maxResult=10&key=${process.env.TRAIL_API_KEY}`)
    .then((res) => {
      const trialData = res.body.trails.map((ourTrail) => {
        return new Trail(ourTrail);
      });
      response.status(200).json(trialData)
    })
    .catch((error) => errorHandler(error, request, response));
}


function Trail(trail) {
  this.name = trail.name;
  this.location = trail.location;
  this.length = trail.length;
  this.stars = trail.stars;
  this.star_votes = trail.starVotes;
  this.summary = trail.summary;
  this.trail_url = trail.url;
  this.condition_time = trail.conditionDate.slice(0, 9);
  this.condition_date = trail.conditionDate.slice(11, 8);
}

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

module.exports = trailHandler;
