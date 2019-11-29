const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const Flash = require('../utils/Flash')

router.get('/validator', (req, res, next) => {
  // console.log(req.flash('fail'))
  // console.log(req.flash('success'))
  console.log(Flash.getMessage(req))
  res.render('playground/signup', { title: 'Validator Playground' })
})

router.post(
  '/validator',
  [
    check('username')
      .not()
      .isEmpty()
      .withMessage('Username Cannot be Empty')
      .isLength({ max: 255 })
      .withMessage(`Username can not be greater than 15 Character`)
      .trim(),
    check('email')
      .isEmail()
      .withMessage(`Please Provide A Valid Email`)
      .normalizeEmail(),
    check('password').custom((value) => {
      if (value.length < 5) {
        throw new Error('Password Must be greater than 5 characters')
      }
      return true
    }),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password Does Not Match')
      }
      return true
    })
  ],
  (req, res, next) => {
    let errors = validationResult(req)

    // const formatter = (error) => error.msg
    // console.log(errors)
    // console.log(errors.formatWith(formatter).mapped())
    // res.render('playground/signup', { title: 'Validator Playground' })

    if (!errors.isEmpty()) {
      req.flash('fail', 'There is Some Error')
    } else {
      req.flash('success', 'There is No Error')
    }
    res.redirect('/playground/validator')
  }
)

module.exports = router
