import React from 'react'

const Comment = ({ comment: { text } }) => {
  return (
    <div className='card'>
      <div className='card-content'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Comment
