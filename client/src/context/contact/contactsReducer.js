import { ACTION_ADD_CONTACT, ACTION_CLEAR_CURRENT, ACTION_DELETE_CONTACT, ACTION_EDIT_CONTACT, ACTION_SET_CURRENT } from "../types";

const contactsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }

    case ACTION_EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts
          .map(item => item.id === action.payload.id ? action.payload : item)
      }

    case ACTION_DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== action.payload)
      }

    case ACTION_CLEAR_CURRENT:
      return {
        ...state,
        current: {}
      }

    case ACTION_SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }

    default: return state
  }
}

export default contactsReducer