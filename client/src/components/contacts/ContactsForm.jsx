import React, { useContext, useState, useEffect } from 'react'
import ContactsContext from '../../context/contact/contactsContext'

const DEFAULT_CONTACT = {
  name: '',
  email: '',
  phone: '',
  type: 'personal'
}

const ContactsForm = () => {
  const contactsContext = useContext(ContactsContext)
  const {
    addContact,
    editContact,
    current,
    clearCurrent
  } = contactsContext
  const [contact, setContact] = useState(DEFAULT_CONTACT)
  const { name, email, phone, type } = contact

  useEffect(() => {
    if (current !== null) setContact(current)
    else setContact(DEFAULT_CONTACT)
  }, [contactsContext, current])

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value })
  }

  const onClear = () => {
    clearCurrent()
    setContact(DEFAULT_CONTACT)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (current === null) {
      addContact(contact)
    } else {
      editContact(contact)
    }

    onClear()
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {!current ? 'Add' : 'Edit'} Contact
      </h2>
      <input type="text"
        placeholder='Name of contact'
        name='name'
        value={name}
        onChange={onChange} />

      <input type="text"
        placeholder='Email of contact'
        name='email'
        value={email}
        onChange={onChange} />

      <input type="text"
        placeholder='Phone number of contact'
        name='phone'
        value={phone}
        onChange={onChange} />

      <h5>Contact Type</h5>
      <input type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange} />{' '}Personal{' '}
      <input type="radio"
        name="type"
        value="work"
        checked={type === 'work'}
        onChange={onChange} />{' '}Work

      <div>
        <input type="submit"
          value="Submit"
          className='btn btn-primary btn-block' />
      </div>

      {current && (
        <div>
          <button className="btn btn-light btn-block"
            onClick={onClear}>
            Clear
          </button>
        </div>
      )}
    </form>
  )
}

export default ContactsForm
