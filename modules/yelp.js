'use strict';
require('dotenv').config();
const superagent = require('superagent');
const key = process.env.YELP_API_KEY;

applicationCache.get('/yelp', (request, respnse) =>{
    superagent(`
    https://api.yelp.com/v3/businesses/search?location=${request.query.search_query} `)
    .then((res) =>{
        const yelpNow = res.body.data.map((yelpData) =>{
            return new Yelp (yelpData)
        });
        respnse.status(200).json(yelpNow)
    })
    .catch((error) =>errorHandler(error, request, response));
    });

    function Yelp(yelpData){
        this.name = yelpData.name;
        this.image_url = yelpData.image_url;
        this.price = yelpData.price;
        this.rating = yelpData.rating;
        this.url = yelpData.url;
        }

        module.exports = yelpPage;
    

