const express = require('express')
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const router = express.Router()

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', (request, response) => {
  response.send('Register a user')
})

module.exports = router