require('dotenv').config()
var createServer = require('./server')

var knex = require('./db/connection')

var server = createServer(knex)
var PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Listening on port', PORT)
})