import React from 'react'

const MainGoal = ({ goal: { avatar, title, text } }) => {
  return (
    <div className='card large blue-grey lighten-4'>
      <div className='card-image'>
        <img src={avatar} alt='goal avatar' />
      </div>
      <div className='card-content'>
        <p className='right-align goal-parent-buttons'>
          <button className='btn-floating waves-effect waves-light green mr10'>
            <i className='material-icons'>done</i>
          </button>
          <button className='btn-floating waves-effect waves-light orange mr10'>
            <i className='material-icons'>edit</i>
          </button>
          <button className='btn-floating waves-effect waves-light red mr10'>
            <i className='material-icons'>delete</i>
          </button>
        </p>
        <span className='card-title'>{title}</span>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default MainGoal
