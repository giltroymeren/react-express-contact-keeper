const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const Contacts = require('../models/Contacts');
const User = require('../models/User');
const bcrypt = require('bcryptjs/dist/bcrypt');
const auth = require('../middleware/auth');

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', auth,
  async (request, response) => {
    try {
      const contacts = await Contacts.find({ user: request.user.id })
        .sort({ date: -1 })
      response.json({ contacts })
    } catch (error) {
      console.error(error.message)
      return response.status(500).send(`Server error occurred: ${error.message}`)
    }
  })

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (request, response) => {
  response.send('Add new contact')
})

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', (request, response) => {
  response.send('Update contact')
})

// @route   PUT api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (request, response) => {
  response.send('Delete contact')
})

module.exports = router