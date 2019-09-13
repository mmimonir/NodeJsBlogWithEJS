const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
  body('email')
    .not()
    .isEmpty()
    .withMessage('Email Can Not Be Empty'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password Can Not Be Empty')
]
