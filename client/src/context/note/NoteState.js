import React, { useReducer } from 'react'
import axios from 'axios'
import NoteContext from './noteContext'
import noteReducer from './noteReducer'
import {
  GET_NOTES,
  ADD_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  NOTE_ERROR
} from '../types'

const NoteState = props => {
  const initialState = {
    notes: []
  }

  const [state, dispatch] = useReducer(noteReducer, initialState)

  // Get notes
  const getNotes = async id => {
    try {
      // Will return notes array
      const res = await axios.get(`/api/notes/${id}`)

      dispatch({
        type: GET_NOTES,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: NOTE_ERROR })
    }
  }

  // Add notes
  const addNote = async (id, note) => {
    try {
      // Will return notes array
      const res = await axios.post(`/api/notes/${id}`, { note })

      dispatch({
        type: ADD_NOTE,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: NOTE_ERROR })
    }
  }

  // Update notes
  const updateNote = async (id, note) => {
    try {
      // Will return notes array
      const res = await axios.put(`/api/notes/${id}`, { note })

      dispatch({
        type: UPDATE_NOTE,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: NOTE_ERROR })
    }
  }

  // Delete notes
  const deleteNote = async id => {
    try {
      // Will return notes array
      const res = await axios.delete(`/api/notes/${id}`)

      dispatch({
        type: DELETE_NOTE,
        payload: res.data
      })
    } catch (err) {
      dispatch({ type: NOTE_ERROR })
    }
  }

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        error: state.error,
        getNotes,
        addNote,
        updateNote,
        deleteNote
      }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState