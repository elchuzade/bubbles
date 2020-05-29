import React from 'react'

const NoteModal = () => {
  return (
    <div className='modal' id='commentModal'>
      <div className='modal-content'>
        <h5 className='mb30'>Add New Note</h5>
        <div className='input-field'>
          <textarea className='materialize-textarea' id='note'></textarea>
          <label htmlFor='note'>Note</label>
        </div>
      </div>
      <div className='modal-footer'>
        <a className='modal-action modal-close waves-effect waves-green btn-flat'>
          Ok
        </a>
      </div>
    </div>
  )
}

export default NoteModal
