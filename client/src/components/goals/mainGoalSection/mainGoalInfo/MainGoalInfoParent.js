import React, { useState } from 'react'

const MainGoalInfoParent = ({ history, parents }) => {
  const [parentIndex, setParentIndex] = useState(0)

  const incrementParentIndex = () => {
    setParentIndex((parentIndex + 1) % parents.length)
  }

  const decrementParentIndex = () => {
    setParentIndex(Math.abs((parentIndex - 1) % parents.length))
  }

  const loadParent = () => {
    history.push(parents[parentIndex]._id)
    setParentIndex(0)
  }

  return (
    <div className='row mt40 valign-wrapper'>
      <div className="col s2">
        <button className={`btn-flat goal-parent-goal-buttons right ${parents.length === 1 && 'disabled'}`} onClick={decrementParentIndex}>
          <i className='material-icons'>chevron_left</i>
        </button>
      </div>
      <div className="col s8" onClick={loadParent}>
        <div className='card horizontal z-depth-0 goal-parent-goal'>
          <div className='card-image'>
            <img
              src={parents[parentIndex].croppedAvatar && parents[parentIndex].croppedAvatar.location}
              alt='parent goal avatar'
            />
          </div>
          <div className='card-stacked'>
            <div className='card-content'>
              <span className='card-title'>{parents[parentIndex].title}</span>
              <p>{parents[parentIndex].text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col s2">
        <button className={`btn-flat goal-parent-goal-buttons ${parents.length === 1 && 'disabled'}`} onClick={incrementParentIndex}>
          <i className='material-icons'>chevron_right</i>
        </button>
      </div>
    </div>
  )
}

export default MainGoalInfoParent
