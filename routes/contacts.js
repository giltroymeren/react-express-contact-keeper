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
router.put('/:id', auth,
  async (request, response) => {
    const { name, email, phone, type } = request.body

    // Build Contacts object
    const newContact = {}
    if (name) newContact.name = name
    if (email) newContact.email = email
    if (phone) newContact.phone = phone
    if (type) newContact.type = type

    try {
      let contact = await Contacts.findById(request.params.id)
      if (!contact) {
        return response.status(404).json({ msg: `Contact not found` })
      }

      // Auth User-Contact ownership
      if (contact.user.toString() !== request.user.id) {
        return response.status(401).json({ msg: `Operation not authorized` })
      }

      contact = await Contacts.findByIdAndUpdate(request.params.id,
        { $set: newContact },
        { new: true }
      )

      response.json(contact)
    } catch (error) {
      console.error(error.message)
      return response.status(500).send(`Server error occurred: ${error.message}`)
    }
  })

// @route   PUT api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (request, response) => {
  response.send('Delete contact')
})

module.exports = router