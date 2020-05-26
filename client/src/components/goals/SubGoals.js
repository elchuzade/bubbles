import React from 'react'
import mockSubGoals from './mockSubGoals.js'
import SubGoal from './SubGoal'

const SubGoals = ({ goals }) => {
  return (
    <div className='row'>
      <div className='col s12'>
        <h4>
          Goals
          <button
            className='btn-floating waves-effect waves-light blue modal-trigger ml10'
            href='#goalModal'
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
