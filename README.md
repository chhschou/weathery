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
* [ ] P2P weather information sharing. Hopefully location based for better experience (Peerjs?) 
* [ ] Decentralized bootstraping (node with latest weather becomes master-peer) http://ns2.thinkmind.org/download.php?articleid=web_2017_1_30_40029

## Basic workflow
1. app loads
2. get user location and populate current location and weather
3. if cannot get user location, show the first location in user's list


#### Information architecture
* settings
  * c/f
  * current location displayed (= -1 initially)
* location
  * id
  * name (i.e. city name)
  * countryName
  * coord
    * lat
    * lon
* weather
  * location id
  * currentCondition
    * datetime (from api response)
    * temp (current, high low for today)
    * feels like temp
    * wind chill adjusted temp (to get layer of clothing needed)
  * hourly10day forecast 
    * datetime (from api response)
    * hourly temp over today
    * feels like temp
  * forecast10day
    * datetime (from api response)
    * temp (high low)
* user
  * location
    * rawCoord
      * lat
      * lon
    * translated location id
  * profile
    * fname
    * lname
    * email
  * social
    * twitter
    * facebook
  * c/f (default)
  * favorite locations (list of location ids) 