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
router.post('/',
  [
    auth,
    body('name', 'Enter a name').not().isEmpty(),
  ],
  async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = request.body
    try {
      const newContact = new Contacts({
        name,
        email,
        phone,
        type,
        user: request.user.id
      })

      const contact = await newContact.save()
      response.json(contact)
    } catch (error) {
      console.error(error.message)
      return response.status(500).send('Server error occurred')
    }
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