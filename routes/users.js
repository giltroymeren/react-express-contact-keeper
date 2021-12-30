const express = require('express')
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const router = express.Router()
const { body, validationResult } = require('express-validator');

const User = require('../models/User')

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/',
  [
    body('name', 'Enter a name').not().isEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password with 6 or more charatcers').isLength({ min: 6 }),
  ],
  (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }
    
    response.send('Register a user')
  })

module.exports = router