const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
  body('username')
    .isLength({ min: 2, max: 255 })
    .withMessage('Username Must Be Between 2 to 255 Chars')
    .custom(async (username) => {
      let user = await User.findOne({ username })
      if (user) {
        return Promise.reject('Username Already Taken')
      }
    })
    .trim(),
  body('email')
    .isEmail()
    .withMessage('Please Provide A Valid Email')
    .custom(async (email) => {
      let user = await User.findOne({ email })
      if (user) {
        return Promise.reject('This Email Already Taken')
      }
    })
    .normalizeEmail(),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Your Password Must Be Greate Than 5 Chars'),
  body('confirmPassword')
    .isLength({ min: 5 })
    .withMessage('Your Password Must Be Greate Than 5 Chars')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Password Does Not Match')
      }
      return true
    })
]
