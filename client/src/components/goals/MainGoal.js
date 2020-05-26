import React, { useContext } from 'react'
import GoalContext from '../../context/goal/goalContext'

const MainGoal = ({ goal: { _id, croppedAvatar, done, title, text } }) => {
  const goalContext = useContext(GoalContext)

  const { doneGoal } = goalContext

  return (
    <div className={`card large ${done ? ' green ' : ' blue-grey '} lighten-4`}>
      <div className='card-image'>
        <img src={croppedAvatar && croppedAvatar.location} alt='goal avatar' />
      </div>
      <div className='card-content'>
        <p className='right-align goal-parent-buttons'>
          {done ? (
            <button
              className='btn-floating waves-effect waves-light brown mr10'
              onClick={() => doneGoal(_id)}
            >
              <i className='material-icons'>clear</i>
            </button>
          ) : (
            <button
              className='btn-floating waves-effect waves-light green mr10'
              onClick={() => doneGoal(_id)}
            >
              <i className='material-icons'>done</i>
            </button>
          )}
          <button
            className='btn-floating waves-effect waves-light orange mr10 modal-trigger'
            href='#goalModal'
          >
            <i className='material-icons'>edit</i>
          </button>
          <button
            className='btn-floating waves-effect waves-light blue mr10 modal-trigger'
            href='#goalAvatarModal'
          >
            <i className='material-icons'>camera_alt</i>
          </button>
          <button className='btn-floating waves-effect waves-light red mr10'>
            <i className='material-icons'>delete</i>
          </button>
        </p>
        <span className='card-title'>{title}</span>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default MainGoal
