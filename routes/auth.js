const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (request, response) => {
  response.send('Get logged in users')
})

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password with 6 or more charatcers').isLength({ min: 6 }),
  ],
  async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const { email, password } = request.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return response.status(400).json({ msg: 'Invalid credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return response.status(400).json({ msg: 'Invalid credentials' })
      }

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload,
        config.get('jwtToken'),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error
          response.json({ token })
        })
      response.send('Log in user')
    } catch (error) {
      console.error(error.message)
      return response.status(500).send(`Server error occurred: ${error.message}`)
    }
  })

module.exports = router