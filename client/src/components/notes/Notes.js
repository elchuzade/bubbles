import React from 'react'
import mockNotes from './mockNotes'
import Note from './Note'

const Notes = ({ notes }) => {
  return (
    <div className='row'>
      <div className='col s12'>
        <h4>
          Notes
          <button
            className='btn-floating blue waves-effect waves-light modal-trigger ml10'
            href='#commentModal'
          >
            <i className='material-icons'>add</i>
          </button>
        </h4>
      </div>
      {notes &&
        notes.map((note, index) => (
          <div className='col s12' key={index}>
            <Note note={note} />
          </div>
        ))}
    </div>
  )
}

export default Notes
