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

module.exports = {
  issue
}