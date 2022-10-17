const jwt = require('jsonwebtoken')
const secret_key = 'KeyBoardWarrior'

function generateToken (payload){
  let token = jwt.sign({
    id: payload.id,
    username: payload.username
  }, secret_key)
  return token
}

function verifyToken (token){
  return jwt.verify(token, secret_key)
}

module.exports = { generateToken, verifyToken } 