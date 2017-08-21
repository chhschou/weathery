const express = require('express')
const router = express.Router()

const {
  userExists,
  createUser
} = require('../db/users')
const { issue } = require('../auth/token')

router.post('/register', register, issue)


function register(req, res, next) {
  const {
    username,
    password
  } = req.body

  userExists(username)
    .then((exists) => {
      if (exists) {
        return res.status(400).send({
          message: 'User exists'
        })
      }
      createUser(username, password)
        .then(() => next())
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      })
    })

  // todo if not hash password and add user to the database
}

module.exports = router