import React from 'react'
import { Link } from 'react-router-dom'

const SubGoal = ({ goal: { _id, done, croppedAvatar, title, text } }) => {
  return (
    <div className={`card ${done ? 'green' : 'blue-grey'} lighten-4 z-depth-1`}>
      <div className='card-image waves-effect waves-light waves-block'>
        <img
          className='activator'
          src={croppedAvatar && croppedAvatar.location}
          alt='sub goal avatar'
        />
      </div>
      <div className='card-content'>
        <span className='card-title activator'>
          <Link to={`/goals/${_id}`}>{title}</Link>
        </span>
      </div>
    </div>
  )
}

export default SubGoal
