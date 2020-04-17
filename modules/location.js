'use strict';
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client
  .connect()
  .then();


function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}


function locationHandler (request, response) {
  const city = request.query.city;
  const SQL = 'SELECT * FROM location WHERE search_query = $1'
  const value = [city]
  client
    .query(SQL, value)
    .then((result) => {
      if(result.rows.length > 0){
        response.status(200).json(result.rows[0]);
        console.log('hi')
      }else{
        superagent(
          `https://eu1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`
        ).then((res) => {
          console.log('helloooo')
          const geoData = res.body;
          const locationData = new Location(city, geoData);
          const SQL = 'INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1,$2,$3,$4) RETURNING *';
          const value = [
            locationData.search_query,
            locationData.formatted_query,
            locationData.latitude,
            locationData.longitude
          ];
          client.query(SQL, value).then((result) => {
            console.log(result.rows);
            response.status(200).json(result.rows[0])
          })
        })
      }
    })
    .catch((err) => errorHandler(err, request, response)
    );
}


module.exports = locationHandler;
