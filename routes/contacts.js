const express = require('express')
const res = require('express/lib/response')
const { append } = require('express/lib/response')
const router = express.Router()

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  Private
router.get('/', (request, response) => {
  response.send('Get all contacts')
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