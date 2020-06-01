import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_ERROR
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => note._id === action.payload._id ? action.payload : note)
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload._id)
      }
    case NOTE_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
