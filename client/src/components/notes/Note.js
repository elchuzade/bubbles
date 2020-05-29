import React from 'react'

const Note = ({ note: { text } }) => {
  return (
    <div className='card'>
      <div className='card-content'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Note
