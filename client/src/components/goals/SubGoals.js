import React from 'react'
import SubGoal from './SubGoal'

const SubGoals = ({ goals, openGoalModal }) => {
  return (
    <div className='row'>
      <div className='col s12'>
        <h4>
          Goals
          <button
            className='btn-floating waves-effect waves-light blue ml10'
            onClick={() => openGoalModal(false)}
          >
            <i className='material-icons'>add</i>
          </button>
        </h4>
      </div>
      {goals &&
        goals.map((goal, index) => (
          <div className='col s12 m3' key={index}>
            <SubGoal goal={goal} />
          </div>
        ))}
    </div>
  )
}

export default SubGoals
