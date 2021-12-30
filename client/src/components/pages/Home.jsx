import React from 'react'
import Contacts from '../contacts/Contacts'
import ContactsForm from '../contacts/ContactsForm'

const Home = () => {
  return (
    <div className='grid-2 '>
      <ContactsForm />

      <div>
        <Contacts />
      </div>
    </div>
  )
}

export default Home
