import React from 'react'
import { Link } from 'react-router-dom'

const MainGoalInfoParent = ({ goal: { _id, croppedAvatar, title, text } }) => {
  return (
    <div className='card horizontal z-depth-0 goal-parent-goal'>
      <div className='card-image'>
        <img
          src={croppedAvatar && croppedAvatar.location}
          alt='parent goal avatar'
        />
      </div>
      <div className='card-stacked'>
        <div className='card-content'>
          <span className='card-title'>{title}</span>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default MainGoalInfoParent
