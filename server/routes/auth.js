const express = require('express')
const router = express.Router()

const {
  userExists,
  createUser
} = require('../db/users')


router.post('/register', register)


function register(req, res) {
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
        .then(() => res.status(201).end())
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      })
    })

  // todo if not hash password and add user to the database
}

module.exports = router