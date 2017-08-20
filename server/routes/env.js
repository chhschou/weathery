var express = require('express')
var router = express.Router()

router.get('/:var', (req, res) => {
  const varName = req.params.var
  if (process.env[varName])
    res.send(process.env[varName])
  else res.status(500).send('Invalid request')
})




module.exports = router