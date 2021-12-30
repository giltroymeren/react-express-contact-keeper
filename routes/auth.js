const express = require('express')
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const router = express.Router()

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (request, response) => {
  response.send('Get logged in users')
})

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (request, response) => {
  response.send('Log in user')
})

module.exports = router