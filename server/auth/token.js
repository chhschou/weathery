const jwt = require('jsonwebtoken')
const verifyJWT = require('express-jwt')
const {
  getUserByName
} = require('../db/users')

function issue(req, res, next) {
  const {
    username
  } = req.body

  getUserByName(username)
    .then((user) => {
      console.log(user)
      const token = createToken(user, process.env.JWT_SECRET)
      res.json({
        message: 'Auth successful',
        token
      })
    })
    .catch((err) => res.status(500).send({
      message: err.message
    }))
}

function createToken(user, secret) {
  // payload (1st arg to sign()) must be an obj to have an expire time set
  return jwt.sign({
    id: user.id,
    username: user.username
  }, secret, {
    expiresIn: '1d'
  })
}

function decode(req, res, next) {
  verifyJWT({
    secret: getSecret
  })(req, res, next)
}

function getSecret(req, payload, done) {
  done(null, process.env.JWT_SECRET)
}

module.exports = {
  issue,
  decode
}