const express = require('express')
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const router = express.Router()
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
  [
    body('name', 'Enter a name').not().isEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password with 6 or more charatcers').isLength({ min: 6 }),
  ],
  async (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    
    const { name, email, password } = request.body
    try {
      let user = await User.findOne({ email })

      if(user) {
        return response.status(400).json({ msg: 'Email already taken' })
      }

      user = new User({
        name,
        email,
        password
      })

      const salt = await bcrypt.genSalt(15)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      response.send(`${email} registered!`)
    } catch (error) {
      console.error(error.message)
      return response.status(500).send('Server error occurred')
    }
  })

module.exports = router