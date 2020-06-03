import React from 'react'
import SubGoal from './SubGoal'

const SubGoals = ({ children, toggleGoalModal }) => {
  return (
    <div className='row'>
      <div className='col s12'>
        <h4>
          Goals
          <button
            className='btn-floating waves-effect waves-light blue ml10'
            onClick={() => toggleGoalModal(true)}
          >
            <i className='material-icons'>add</i>
          </button>
        </h4>
      </div>
      {children &&
        children.map((child, index) => (
          <div className='col s12 m3' key={index}>
            <SubGoal child={child} />
          </div>
        ))}
    </div>
  )
}

export default SubGoals
