import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactsContext from '../../context/contact/contactsContext'

const ContactsItem = ({ contact }) => {
  const contactsContext = useContext(ContactsContext)
  const { deleteContact } = contactsContext
  const { id, name, email, phone, type } = contact

  const onDelete = () => {
    deleteContact(id)
  }

  return (
    <div className='card bg-light'>
      <h3 className="text-primary text-left">
        {name}{' '} <span
          className={`badge ${type === 'work' ? 'badge-success' : 'badge-primary'}`}
          style={{ float: 'right' }}>
          {type.toUpperCase()}
        </span>
      </h3>

      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>

      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm"
          onClick={onDelete}>Delete</button>
      </p>
    </div>
  )
}

ContactsItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactsItem
