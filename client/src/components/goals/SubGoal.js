import React from 'react'

const SubGoal = ({ goal: { avatar, title, text } }) => {
  return (
    <div className='card blue-grey lighten-4 z-depth-1'>
      <div className='card-image waves-effect waves-light waves-block'>
        <img className='activator' src={avatar} />
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
        <a href='#!'>Read More</a>
      </div>
    </div>
  )
}

export default SubGoal
