const jwt = require('jsonwebtoken')
const {
  getUserByName
} = require('../db/users')

function issue(req, res, next) {
  const {
    username
  } = req.body

  getUserByName(username)
    .then((user) => {
      const token = createToken(user.username, process.env.JWT_SECRET)
      res.json({
        message: 'Auth successful',
        token
      })
    })
    .catch((err) => res.status(500).send({
      message: err.message
    }))
}

function createToken(username, secret) {
  return jwt.sign(user.username, secret, {
    expiresIn: '1d'
  })
}

module.exports = {
  issue
}