import { ACTION_ADD_CONTACT, ACTION_DELETE_CONTACT } from "../types";

const contactsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }

    case ACTION_DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== action.payload)
      }

    default: return state
  }
}

export default contactsReducer