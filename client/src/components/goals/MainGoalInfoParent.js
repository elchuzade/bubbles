import React from 'react'
import { Link } from 'react-router-dom'

const MainGoalInfoParent = ({ goal: { _id, croppedAvatar, title, text } }) => {
  return (
    <div className='card horizontal z-depth-0 goal-parent-goal'>
      <div className='card-image'>
        <Link to={`/goals/${_id}`}>
          <img src={croppedAvatar && croppedAvatar.location} />
        </Link>
      </div>
      <div className='card-stacked'>
        <div className='card-content'>
          <span className='card-title'>
            <Link to={`/goals/${_id}`}>{title}</Link>
          </span>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}

export default MainGoalInfoParent
