'use strict';
// steps to start the server ..
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;



app.use(cors());
// app.use(errorHandler);
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);


const locationHandler = require('./modules/location.js');
const weatherHandler = require('./modules/weather.js');
const trailHandler = require('./modules/trails.js');
const yelpHandler = require('./modules/yelp.js');
const movieHandler = require('./modules/movies.js');




app.get('/location',locationHandler);
app.get('/weather',weatherHandler);
app.get('/trails',trailHandler);
app.get('/movies',movieHandler);
app.get('/yelp',yelpHandler);

app.use('*', notFoundHandler);
app.use(errorHandler);

app.get('/', (request, response) => {// API Main Route:
  response.status(200).send('Home Page!');
});


/////////////////////////////////////////////////////////////////////////////////


function notFoundHandler(request, response) {
  response.status(404).send('NOT FOUND!!');
}
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



