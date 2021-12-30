import { useReducer } from "react";
import ContactsContext from './contactsContext'
import contactsReducer from './contactsReducer'

const ContactsState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Abcde Fghij",
        email: "abcde@fghij.com",
        phone: "111-222-3333",
        type: "work",
      },
      {
        id: 2,
        name: "Bcdef Ghijk",
        email: "bcd@efgh.com",
        phone: "010-202-3030",
        type: "personal",
      },
      {
        id: 3,
        name: "Cdefg Hijkl",
        email: "cde@efgh.com",
        phone: "199-299-3999",
        type: "personal",
      },
    ]
  }

  const [state, dispatch] = useReducer(contactsReducer, initialState)

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts
      }}>
      {props.children}
    </ContactsContext.Provider>
  )
}

export default ContactsState