export default function getWUConditionsData() {
  // http://api.wunderground.com/api/<apikey>/conditions/q/new_zealand/Wellington.json
  return require('./wu.json').condition
}
