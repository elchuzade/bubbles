import React from 'react'

const CommentModal = () => {
  return (
    <div className='modal' id='commentModal'>
      <div className='modal-content'>
        <h5 className='mb30'>Add New Comment</h5>
        <div className='input-field'>
          <textarea className='materialize-textarea' id='comment'></textarea>
          <label htmlFor='comment'>Comment</label>
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

export default CommentModal
