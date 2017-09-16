export default function getWUF10Data() {
  // http://api.wunderground.com/api/<apikey>/forecast10day/q/new_zealand/Wellington.json
  return require('./wu.json').h10
}