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
          <span className='card-title activator'>{title}</span>
        </div>
        <div className='card-reveal'>
          <span className='card-title'>
            {title}
            <i className='material-icons'>close</i>
          </span>
          <p>{text}</p>
          <Link to={`/goals/${_id}`}>Read More</Link>
        </div>
      </div>
  )
}

export default SubGoal
