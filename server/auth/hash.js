const sodium = require('sodium').api

function generate(password) {
  const buffer = Buffer.from(password, 'utf8')
  return sodium.crypto_pwhash_str(
    buffer,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
  )
}


module.exports = {
  generate
}