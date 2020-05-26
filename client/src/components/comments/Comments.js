import React from 'react'
import mockComments from './mockComments'
import Comment from './Comment'

const Comments = ({ comments }) => {
  return (
    <div className='row'>
      <div className='col s12'>
        <h4>
          Comments
          <button
            className='btn-floating blue waves-effect waves-light modal-trigger ml10'
            href='#commentModal'
          >
            <i className='material-icons'>add</i>
          </button>
        </h4>
      </div>
      {comments.map((comment, index) => (
        <div className='col s12' key={index}>
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  )
}

export default Comments
