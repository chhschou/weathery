const connection = require('./connection')
const {
  generate
} = require('../auth/hash')

module.exports = {
  userExists,
  createUser
}

function userExists(username, conn) {
  const db = conn || connection
  return db('users')
    .where('username', username)
    .count('id as n')
    .then(count => {
      return count[0].n > 0
    })
}

function createUser(username, password, conn) {
  const db = conn || connection
  return db('users').insert({
    username,
    hash: generate(password)
  })
}