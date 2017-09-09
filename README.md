# Weathery
Simple current weather and forecast

## Install
```
git clone https://github.com/chhschou/weathery
cd weathery
touch .env
```

Weathery uses a .env file to store API keys. You need to have the following in your `.env` file
```
OPENWEATHERMAP_APIKEY=<your openweathermap.org api key>
G_MAP_STATIC_APIKEY=<your google map api key> 
```

Weathery is a node+React app, use `npm` to install dependencies and run app
```
npm install
npm knex run migrate:latest
npm knex run seed:run
npm start # visit Weathery on http://localhost:3000/
```

## Deploy to Heroku
Weathery has appropriate setup for Heroku deployment but postgresql database needs to be setup on the Heroku instance.
Once a postgresql database is available, run the following command for migration and optionally seed data.
```
npm run h:migrate
npm run h:seed # optional, will replace existing data with seeds
```

## MVP
* [ ] As a user I want to see weather forecast at my current location
* [ ] As a user I want to see weather forecast at other locations by city name
* [ ] As a user I want to see weather forecast of my favorite places

## Stretch
* [ ] As a user I want to easily view on mobile device (iphone 6 optimized)
* [ ] As a user I want to share weather at my current location to social media (priority twitter, facebook)


#### Information architecture
* weather
  * id
  * location
    * name (i.e. city name)
    * countryName
    * lat
    * lon
  * currentCondition
    * time
    * temp (current, high low for today)
    * feels like
    * wind chill adjusted temp (to get layer of clothing needed)
  * hourly 10day forecast 
    * hourly temp over today
  * 10day forecast
    * feels like
    * temp (high low)
* settings
  * current display city id
  * c/f
  * default city id
  * favorite cities (list of ids) 