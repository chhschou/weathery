
export default function getWUH10Data() {
  // http://api.wunderground.com/api/<apikey>/hourly10day/q/new_zealand/Wellington.json

  return require('./wu.json').h10
}