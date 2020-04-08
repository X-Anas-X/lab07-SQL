'use strict';
// steps to start the server ..
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());
// app.use(errorHandler);
const superagent = require('superagent');
const pg = require('pg');


const weatherPage = require('./modules/weather');
const locationPage = require('./modules/location');
const yelpPage = require('./modules/yelp');
const moviePage = require('./modules/movies');
const trailPage = require('./modules/trails');



app.get('/location',locationPage);
app.get('/weather',weatherPage);
app.get('/trails',trailPage);
app.get('/movies',moviePage);
app.get('/yelp',yelpPage);

const client = new pg.Client(process.env.DATABASE_URL);

/////////////////////////////////////////////////////////////////////////////////


function errorHandler(error, request, response) {
  response.status(500).send(error);
}

/////////////////////////////////////////////////////////////////////////

client
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`PORT ${PORT}`);
    });
  })
  .catch((err) => {
    throw new Error(err)
  });



