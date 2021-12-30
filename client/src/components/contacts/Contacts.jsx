import React, { useContext } from 'react'
import ContactsContext from '../../context/contact/contactsContext'
import ContactsItem from './ContactsItem'

const Contacts = () => {
  const contactsContext = useContext(ContactsContext)
  const { contacts } = contactsContext

  return (
    <React.Fragment>
      {contacts.map(contact => {
        return <ContactsItem key={contact.id} contact={contact} />
      })}
    </React.Fragment>
  )
}

export default Contacts
