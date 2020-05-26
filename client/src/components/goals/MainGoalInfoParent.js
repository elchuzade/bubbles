import React from 'react'

const MainGoalInfoParent = ({ goal: { avatar, title, text } }) => {
  return (
    <div className='card horizontal z-depth-0 goal-parent-goal'>
      <div className='card-image'>
        <img src={avatar} />
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
