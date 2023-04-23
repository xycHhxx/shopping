import jwt from 'jsonwebtoken'

const secret = 'xyc66888'

const JWT = {
  generate: (value, expires) => {
    return jwt.sign(value, secret, { expiresIn: expires })
  },

  verify: token => {
    try {
      return jwt.verify(token, secret)
    } catch (err) {
      return false
    }
  }
}

export default JWT
