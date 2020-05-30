import React, { useContext } from 'react'
import GoalContext from '../../../../context/goal/goalContext'

const MainGoal = ({
  goal: { parent, user, _id, croppedAvatar, done, title, quote },
  toggleGoalModal,
  setEditMode
}) => {
  const goalContext = useContext(GoalContext)

  const { doneGoal } = goalContext

  const mainGoal = parent === user

  return (
    <div className={`card large ${done ? ' green ' : ' blue-grey '} lighten-4`}>
      <div className='card-image'>
        <img src={croppedAvatar && croppedAvatar.location} alt='goal avatar' />
      </div>
      <div className='card-content'>
        {mainGoal ? (
          <p className='right-align goal-parent-buttons'>
            <button
              className='btn-floating waves-effect waves-light blue mr10 modal-trigger'
              href='#goalAvatarModal'
            >
              <i className='material-icons'>camera_alt</i>
            </button>
          </p>
        ) : (
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
              className='btn-floating waves-effect waves-light orange mr10'
              onClick={() => {
                setEditMode(true)
                toggleGoalModal(true, true)
              }}
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
        )}
        <span className='card-title'>{title}</span>
        {quote && (
          <blockquote>
            "{quote.text}"
            <br />
            <cite>{quote && quote.author}</cite>
          </blockquote>
        )}
      </div>
    </div>
  )
}

export default MainGoal
